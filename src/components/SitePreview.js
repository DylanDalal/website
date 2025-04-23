import React, { useMemo } from "react";
import "./SitePreview.scss";             // keep the small style helper

function SitePreview({
  src,
  title,
  width = 400,
  height = 225,
  desktopW = 1920,
  desktopH = 1080,
}) {
  // compute the scale only when dimensions change
  const iframeStyle = useMemo(() => {
    const scale = Math.min(width / desktopW, height / desktopH) ;
    return {
      width: desktopW,
      height: desktopH,
      transform: `scale(${scale})`,
      transformOrigin: "top left",
    };
  }, [width, height, desktopW, desktopH]);

  return (
    <div className="site-preview" style={{ width, height }}>
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        style={iframeStyle}
      />
    </div>
  );
}

export default SitePreview;
