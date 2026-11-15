// A CSS-only phone so previews look like a real reel/story
export default function PhoneFrame({ children, className = '' }) {
  return (
    <div className={`relative mx-auto aspect-[9/18.5] w-full max-w-[290px] rounded-[2.6rem] border-[7px] border-[#111] bg-[#111] shadow-2xl shadow-black/50 ${className}`}>
      <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
      <div className="h-full w-full overflow-hidden rounded-[2.1rem]">{children}</div>
    </div>
  )
}
