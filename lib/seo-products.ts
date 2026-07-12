export const siteUrl = "https://zentux.gg";

export const seoProducts = [
  {
    slug: "zentux-v7",
    name: "Zentux v7",
    title: "Zentux v7 | Gaming Automation Tool for Windows",
    description:
      "Discover Zentux v7, a lightweight Windows gaming automation tool built for control and performance.",
    category: "Gaming Automation Tool",
    operatingSystem: "Windows",
    image: "/zentux-autoclicker.png",
  },
  {
    slug: "zentux-optimizer",
    name: "Zentux Optimizer",
    title: "Zentux Optimizer | Windows Gaming Performance Tool",
    description:
      "Zentux Optimizer is a Windows gaming performance tool designed to provide a lightweight and streamlined experience.",
    category: "Gaming Performance Tool",
    operatingSystem: "Windows",
    image: "/producto.png",
  },
  {
    slug: "zentux-recorder",
    name: "Zentux Recorder",
    title: "Zentux Recorder | Macro Tool for Windows",
    description:
      "Zentux Recorder is a Windows macro tool from Zentux built for simple recording and control.",
    category: "Macro Tool",
    operatingSystem: "Windows",
    image: "/zentux-macro.png",
  },
] as const;

export type SeoProduct = (typeof seoProducts)[number];

export function getProductUrl(slug: string) {
  return `${siteUrl}/products/${slug}`;
}
