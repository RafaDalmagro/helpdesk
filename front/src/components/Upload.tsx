import uploadIcon from "../assets/uploadIcon.svg";

type Props = React.ComponentProps<"input"> & {
    fileName?: string | null;
};

export function Upload({ fileName = null, ...rest }: Props) {
    return (
        <div className="group relative rounded-md bg-gray-500 hover:bg-gray-400 transition-colors ease-linear overflow-hidden">
            <label
                htmlFor="upload"
                className="flex items-center gap-2 p-2 w-full h-full cursor-pointer">
                <img
                    src={uploadIcon}
                    alt="Upload Icon"
                    className="pointer-events-none"
                />

                <span className="text-xs text-gray-200 font-bold pointer-events-none truncate">
                    {fileName ?? "Nova imagem"}
                </span>

                <input {...rest} type="file" id="upload" className="sr-only" />
            </label>
        </div>
    );
}
