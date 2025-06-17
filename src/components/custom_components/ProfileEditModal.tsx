import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";

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
  const imageRef = useRef<HTMLImageElement | null>(null);
  const cropBoxSize = 300;

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      setSelectedImage(null);
      setImageUrl("");
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setDragging(false);
      setDragStart({ x: 0, y: 0 });
    }
  }, [open]);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      setImageUrl(URL.createObjectURL(file));
      setCrop({ x: 0, y: 0 });
      setZoom(1);
    }
  };

  // Drag to move crop
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setDragStart({ x: e.clientX - crop.x, y: e.clientY - crop.y });
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    setCrop({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
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
  });

  // Crop and export image
  const handleCrop = () => {
    if (!imageRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = cropBoxSize;
    canvas.height = cropBoxSize;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Calculate cropping
    const img = imageRef.current;
    const scale = img.naturalWidth / img.width;
    const sx = Math.max(0, -crop.x * scale);
    const sy = Math.max(0, -crop.y * scale);
    const sWidth = (cropBoxSize * scale) / zoom;
    const sHeight = (cropBoxSize * scale) / zoom;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative flex w-full max-w-md flex-col items-center rounded-2xl bg-[#181C23] p-6 shadow-lg">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
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
        <h2 className="mb-4 text-xl font-bold">Upload & Crop Image</h2>
        {!selectedImage ? (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-4"
            />
            <div className="text-sm text-gray-400">
              Choose an image to upload
            </div>
          </>
        ) : (
          <>
            <div
              className="relative mb-4 overflow-hidden rounded-full border bg-gray-900"
              style={{
                width: cropBoxSize,
                height: cropBoxSize,
                cursor: dragging ? "grabbing" : "grab",
              }}
              onMouseDown={handleMouseDown}
            >
              <Image
                ref={imageRef}
                src={imageUrl}
                alt="To crop"
                className="absolute"
                style={{
                  left: crop.x,
                  top: crop.y,
                  width: cropBoxSize * zoom,
                  height: cropBoxSize * zoom,
                  objectFit: "cover",
                  userSelect: "none",
                  pointerEvents: "none",
                }}
                draggable={false}
              />
              <div
                className="absolute rounded-full border-2 border-white"
                style={{
                  left: 0,
                  top: 0,
                  width: cropBoxSize,
                  height: cropBoxSize,
                  pointerEvents: "none",
                }}
              />
            </div>
            <div className="mb-4 flex items-center gap-2">
              <span className="text-sm text-gray-400">Zoom</span>
              <input
                type="range"
                min={1}
                max={3}
                step={0.01}
                value={zoom}
                onChange={e => setZoom(Number(e.target.value))}
              />
              <span className="text-sm text-gray-400">{zoom.toFixed(2)}x</span>
            </div>
            <div className="flex gap-4">
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="default" onClick={handleCrop}>
                Crop & Save
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
// --- End Modal ---

export default ImageCropModal;
