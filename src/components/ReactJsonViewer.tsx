// External Imports
import Editor from "@monaco-editor/react";
import copy from "clipboard-copy";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components Imports
import Button from "./Button";

/**
 * React component for displaying JSON data using Monaco Editor.
 *
 * @component
 * @param {Object} props - The properties of the component.
 * @param {any} props.src - The JSON data to be displayed.
 * @param {any} props.cb - Additional callback function.
 * @returns {JSX.Element} - The rendered component.
 */
const ReactJsonViewer: React.FC<{
  src: string;
  name: string | null;
  cb?: Function;
}> = ({ src, name, cb = () => {} }) => {
  const handleCopyClick = () => {
    // Copy the JSON data to the clipboard
    copy(src);
    const notify = () =>
      toast("Your JSON data has been copied to your clipboard.");
    notify();
  };

  const handleDownloadClick = () => {
    // Create a Blob with the JSON data
    const blob = new Blob([src], { type: "application/json" });

    // Create a link element and trigger a download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = name ? `${name}.json` : "json_data.json";
    link.click();
  };

  return (
    <div>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        theme="dark"
        progressStyle={{ backgroundColor: "orange" }}
        style={{
          fontFamily: "Inter !important",
        }}
      />
      <div className="flex gap-3 my-3 justify-center">
        <Button label="Copy" className="w-[150px]" onClick={handleCopyClick} />
        <Button
          label="Download"
          className="w-[150px]"
          onClick={handleDownloadClick}
        />
        <Button
          label="Clear"
          className="w-[150px]"
          onClick={() => {
            cb();
          }}
        />
      </div>
      <div className="border-red-400 border-2 mb-10">
        {/* Monaco Editor for displaying JSON data */}
        <Editor
          height="70vh"
          defaultLanguage="json"
          value={src}
          theme="vs-dark"
          language="json"
        />
      </div>
    </div>
  );
};

export default ReactJsonViewer;
