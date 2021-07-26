import React from "react";
import ContentLoader from "react-content-loader";

function ImagePlaceholder({ width, height }) {
	const viewBoxStr = "0 0 " + width + " " + height;
	return (
		<ContentLoader
			speed={2}
			width={width}
			height={height}
			viewBox={viewBoxStr}
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb"
		>
			<rect x="0" y="0" rx="0" ry="0" width={width} height={height} />
		</ContentLoader>
	);
}

export default ImagePlaceholder;
