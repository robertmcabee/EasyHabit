function ColorSelect({
  color,
  handleColorChange,
}: {
  color: string;
  handleColorChange: (color: string) => void;
}) {
  const colorArr = [
    "rgb(34,211,238)",
    "rgb(52,211,153)",
    "rgb(163,230,53)",
    "rgb(250,204,21)",
    "rgb(251,146,60)",
    "rgb(251,113,133)",
    "hsl(186,94%,82%)",
    "hsl(152,76%,80%)",
    "hsl(81,88%,80%)",
    "hsl(53,98%,77%)",
    "hsl(32,98%,83%)",
    "hsl(353,96%,90%)",
  ];

  const colorClass =
    "h-12 w-12 cursor-pointer rounded-full transition-all hover:opacity-75 border-neutral-300 dark:border-neutral-500";

  return (
    <div className=" grid max-w-fit grid-cols-6 grid-rows-2 justify-evenly gap-1.5 sm:gap-4">
      {colorArr.map((item, index) => {
        return (
          <div
            key={index}
            className={colorClass + (color === item ? "" : " border-8")}
            style={{ backgroundColor: item }}
            onClick={() => handleColorChange(item)}
          ></div>
        );
      })}
    </div>
  );
}

export default ColorSelect;
