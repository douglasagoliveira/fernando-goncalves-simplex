import whiteLogo from "../../imports/optimized/simplex-branco-320.webp"
import colorLogo from "../../imports/optimized/simplex-colorido-320.webp"

export function BrandLogo({
  variant = "white",
  className = "",
}: {
  variant?: "white" | "color"
  className?: string
}) {
  return (
    <img
      src={(variant === "white" ? whiteLogo : colorLogo).src}
      width={320}
      height={315}
      alt="SIMPLEX — Sistema Motivacional para Performances de Excelência"
      className={`object-contain ${className}`}
      decoding="async"
    />
  )
}
