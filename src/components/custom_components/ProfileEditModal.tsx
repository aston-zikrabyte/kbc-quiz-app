import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import NextImage from "next/image";

const ImageCropModal = ({
  open,
  onClose,
  onCrop,
}: {
  open: boolean;
  onClose: () => void;
  onCrop: (croppedUrl: string) => void;
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [cropStart, setCropStart] = useState({ x: 0, y: 0 });
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [cropBoxSize, setCropBoxSize] = useState(200);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      setSelectedImage(null);
      setImageUrl("");
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setDragging(false);
      setDragStart({ x: 0, y: 0 });
      setCropStart({ x: 0, y: 0 });
      setImageDimensions({ width: 0, height: 0 });
      setCropBoxSize(200);
    }
  }, [open]);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setCrop({ x: 0, y: 0 });
      setZoom(1);

      // Load image to get dimensions
      const img = new window.Image();
      img.onload = () => {
        const maxDisplaySize = 400;
        let displayWidth = img.width;
        let displayHeight = img.height;

        // Scale down if too large
        if (img.width > maxDisplaySize || img.height > maxDisplaySize) {
          const scale = Math.min(
            maxDisplaySize / img.width,
            maxDisplaySize / img.height
          );
          displayWidth = img.width * scale;
          displayHeight = img.height * scale;
        }

        setImageDimensions({ width: displayWidth, height: displayHeight });

        // Set crop box size to be smaller than the smallest dimension
        const minDimension = Math.min(displayWidth, displayHeight);
        const boxSize = Math.min(200, minDimension * 0.8);
        setCropBoxSize(boxSize);

        // Center the crop box initially
        setCrop({
          x: (displayWidth - boxSize) / 2,
          y: (displayHeight - boxSize) / 2,
        });
      };
      img.src = url;
    }
  };

  // Drag to move crop box
  const handleCropMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setCropStart({ x: crop.x, y: crop.y });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging || !containerRef.current) return;

    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;

    // Calculate new crop position
    let newX = cropStart.x + dx;
    let newY = cropStart.y + dy;

    // Constrain crop box within image bounds
    const scaledImageWidth = imageDimensions.width * zoom;
    const scaledImageHeight = imageDimensions.height * zoom;
    const scaledCropSize = cropBoxSize * zoom;

    newX = Math.max(0, Math.min(scaledImageWidth - scaledCropSize, newX));
    newY = Math.max(0, Math.min(scaledImageHeight - scaledCropSize, newY));

    setCrop({ x: newX, y: newY });
  };

  const handleMouseUp = () => setDragging(false);

  useEffect(() => {
    if (dragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [dragging, dragStart, cropStart, imageDimensions, zoom, cropBoxSize]);

  // Handle zoom change
  const handleZoomChange = (newZoom: number) => {
    const centerX = crop.x + (cropBoxSize * zoom) / 2;
    const centerY = crop.y + (cropBoxSize * zoom) / 2;

    const newCropX = centerX - (cropBoxSize * newZoom) / 2;
    const newCropY = centerY - (cropBoxSize * newZoom) / 2;

    // Constrain to bounds
    const scaledImageWidth = imageDimensions.width * newZoom;
    const scaledImageHeight = imageDimensions.height * newZoom;
    const scaledCropSize = cropBoxSize * newZoom;

    const constrainedX = Math.max(
      0,
      Math.min(scaledImageWidth - scaledCropSize, newCropX)
    );
    const constrainedY = Math.max(
      0,
      Math.min(scaledImageHeight - scaledCropSize, newCropY)
    );

    setZoom(newZoom);
    setCrop({ x: constrainedX, y: constrainedY });
  };

  // Crop and export image
  const handleCrop = () => {
    if (!imageRef.current) return;

    const img = imageRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = cropBoxSize;
    canvas.height = cropBoxSize;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Calculate the scale factor from display size to natural size
    const scaleX = img.naturalWidth / imageDimensions.width;
    const scaleY = img.naturalHeight / imageDimensions.height;

    // Calculate source coordinates in natural image size
    const sx = (crop.x / zoom) * scaleX;
    const sy = (crop.y / zoom) * scaleY;
    const sWidth = (cropBoxSize / zoom) * scaleX;
    const sHeight = (cropBoxSize / zoom) * scaleY;

    ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, cropBoxSize, cropBoxSize);

    canvas.toBlob(
      blob => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          onCrop(url);
          onClose();
        }
      },
      "image/jpeg",
      0.95
    );
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="relative flex w-full max-w-lg flex-col items-center rounded-2xl bg-[#181C23] p-6 shadow-lg">
        <button
          className="absolute top-3 right-3 z-10 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="mb-4 text-xl font-bold text-white">
          Upload & Crop Image
        </h2>

        {!selectedImage ? (
          <div className="flex flex-col items-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-4 cursor-pointer rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-gray-200 transition-colors hover:bg-gray-700"
            />
            <div className="text-sm text-gray-400">
              Choose an image to upload and crop
            </div>
          </div>
        ) : (
          <div className="flex w-full flex-col items-center">
            {/* Image container with crop overlay */}
            <div
              ref={containerRef}
              className="relative mb-4 overflow-hidden rounded-lg border border-gray-600 bg-gray-900"
              style={{
                width: imageDimensions.width * zoom,
                height: imageDimensions.height * zoom,
                maxWidth: "100%",
                maxHeight: "60vh",
              }}
            >
              {/* Static image */}
              <NextImage
                ref={imageRef}
                src={imageUrl}
                alt="Image to crop"
                width={imageDimensions.width * zoom}
                height={imageDimensions.height * zoom}
                style={{
                  width: imageDimensions.width * zoom,
                  height: imageDimensions.height * zoom,
                  objectFit: "contain",
                  userSelect: "none",
                  pointerEvents: "none",
                }}
                draggable={false}
              />

              {/* Dark overlay */}
              <div
                className="bg-opacity-50 pointer-events-none absolute inset-0 bg-black/50"
                style={{
                  maskImage: `radial-gradient(circle at ${crop.x + (cropBoxSize * zoom) / 2}px ${crop.y + (cropBoxSize * zoom) / 2}px, transparent ${(cropBoxSize * zoom) / 2}px, black ${(cropBoxSize * zoom) / 2 + 2}px)`,
                  WebkitMaskImage: `radial-gradient(circle at ${crop.x + (cropBoxSize * zoom) / 2}px ${crop.y + (cropBoxSize * zoom) / 2}px, transparent ${(cropBoxSize * zoom) / 2}px, black ${(cropBoxSize * zoom) / 2 + 2}px)`,
                }}
              />

              {/* Moveable crop circle */}
              <div
                className="absolute rounded-full border-2 border-white bg-transparent"
                style={{
                  left: crop.x,
                  top: crop.y,
                  width: cropBoxSize * zoom,
                  height: cropBoxSize * zoom,
                  cursor: dragging ? "grabbing" : "grab",
                  boxShadow: "0 0 0 2px rgba(255,255,255,0.3)",
                }}
                onMouseDown={handleCropMouseDown}
              />

              {/* Center crosshair */}
              <div
                className="pointer-events-none absolute"
                style={{
                  left: crop.x + (cropBoxSize * zoom) / 2 - 10,
                  top: crop.y + (cropBoxSize * zoom) / 2 - 1,
                  width: 20,
                  height: 2,
                  backgroundColor: "rgba(255,255,255,0.8)",
                }}
              />
              <div
                className="pointer-events-none absolute"
                style={{
                  left: crop.x + (cropBoxSize * zoom) / 2 - 1,
                  top: crop.y + (cropBoxSize * zoom) / 2 - 10,
                  width: 2,
                  height: 20,
                  backgroundColor: "rgba(255,255,255,0.8)",
                }}
              />
            </div>

            {/* Zoom control */}
            <div className="mb-4 flex w-full max-w-xs items-center gap-3">
              <span className="text-sm whitespace-nowrap text-gray-400">
                Zoom
              </span>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={e => handleZoomChange(Number(e.target.value))}
                className="slider h-2 flex-1 cursor-pointer appearance-none rounded-lg bg-gray-700"
              />
              <span className="min-w-[40px] text-sm whitespace-nowrap text-gray-400">
                {zoom.toFixed(1)}x
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex w-full max-w-xs gap-4">
              <Button variant="secondary" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button variant="default" onClick={handleCrop} className="flex-1">
                Crop & Save
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCropModal;
