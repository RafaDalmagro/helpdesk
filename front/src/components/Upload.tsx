import uploadIcon from "../assets/uploadIcon.svg";

type Props = React.ComponentProps<"input"> & {
    fileName?: string | null;
};

export function Upload({ fileName = null, ...rest }: Props) {
    return (
        <div className="rounded-md bg-gray-500 flex items-center p-2 h-full gap-2 hover:bg-gray-400 transition ease-linear cursor-pointer">
            <label
                htmlFor="upload"
                className="flex relative gap-2 items-center w-full h-full cursor-pointer">
                <img src={uploadIcon} alt="Upload Icon" />
                <span className="text-xs text-gray-200 font-bold cursor-pointer">
                    Nova imagem
                </span>
                <input
                    {...rest}
                    type="file"
                    id="upload"
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
            </label>
        </div>
    );
}
