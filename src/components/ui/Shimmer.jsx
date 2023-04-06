// Image Shimmer
{
	/* <Image
	src={assetImage}
	alt="asset image"
	width="800"
	height="800"
	className="rounded-2xl"
	placeholder="blur"
	blurDataURL={shimmer(800, 800, theme)}
	style={{
		maxWidth: "100%",
		height: "auto",
		width: "auto",
		maxHeight: "100%",
		objectFit: "cover",
		overflow: "hidden",
	}}
/>; */
}

const shimmerLight = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#a8a8a8" offset="20%" />
      <stop stop-color="#d4d4d4" offset="50%" />
      <stop stop-color="#a8a8a8" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#a8a8a8" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const shimmerDark = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str) => (typeof window === "undefined" ? Buffer.from(str).toString("base64") : window.btoa(str));

export const shimmer = (w, h, theme) => {
	return "data:image/svg+xml;base64," + (theme === "dark" ? toBase64(shimmerDark(w, h)) : toBase64(shimmerLight(w, h)));
};
