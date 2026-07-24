import { useEffect, useState } from "react";

export default function ImageOverlay({
  image,
  onClose,
}) {
  const [visible, setVisible] =
    useState(false);

  useEffect(() => {
    if (image) {
      requestAnimationFrame(() =>
        setVisible(true)
      );
    }
  }, [image]);

  if (!image) {
    return null;
  }

  function handleClose() {
    setVisible(false);

    setTimeout(() => {
      onClose();
    }, 180);
  }

  return (
    <div
      className={
        visible
          ? "image-overlay"
          : "image-overlay closing"
      }
      onClick={handleClose}
    >
      <button
        type="button"
        className="image-overlay-close"
        onClick={handleClose}
      >
        ×
      </button>

      <img
        src={image}
        alt=""
        className="image-overlay-img"
        onClick={(event) =>
          event.stopPropagation()
        }
      />
    </div>
  );
}