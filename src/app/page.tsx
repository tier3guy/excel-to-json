"use client";

// Internal Imports
import React, { useRef, SyntheticEvent, useState, ChangeEvent } from "react";

// External Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import {
  faCloudArrowUp,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components Imports
import Button from "@/components/Button";
import Input from "@/components/Input";
import ReactJsonViewer from "@/components/ReactJsonViewer";

// Constants
import { API_BASE_URL } from "../constants";

/**
 * @name - Home Component
 * @author - Avinash Gupta
 * @description - The main component for the Excel to JSON Converter app.
 */
const Home: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [responseData, setResponseData] = useState(null);
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);

  /**
   * Handle click event on the file input.
   * This function triggers a click on the hidden file input to open the file selection dialog.
   *
   * @param {SyntheticEvent} event - The click event.
   */
  const inputClickHandler = (event: SyntheticEvent) => {
    try {
      if (inputRef.current) {
        inputRef.current.click();
        setUrl("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Handle file change event.
   * This function is triggered when a file is selected using the file input.
   *
   * @param {ChangeEvent<HTMLInputElement>} event - The change event.
   */
  const onFileChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const selectedFile = event.target.files?.[0];
      if (selectedFile) {
        setFile(selectedFile);
        setResponseData(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Handle click event on the "Convert to JSON" button.
   * This function initiates the conversion of the selected file to JSON.
   */
  const onConvertFileClick = async () => {
    if (!file) return;
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file.name);
      const response = await fetch(`${API_BASE_URL}/csv-to-json`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result && result.status === 201) {
        setResponseData(result.data);
      }
    } catch (error) {
      const notify = () =>
        toast("Some error has been occured. Check the console to know more.");
      notify();
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle enter button press event and icon click event on the Input icon button.
   * This function initiates the downloading of the file of the given url and initiates the conversion of the selected file to JSON.
   */
  const onUrlEnter = async () => {
    if (!url) return;
    try {
      setLoading(true);
      const fileType = url.split("/")[3];
      let extenstion = "";

      switch (fileType) {
        case "spreadsheets":
          extenstion = "xlsx";
          break;
        case "file":
          extenstion = "csv";
          break;
        default:
          break;
      }

      if (extenstion === "") {
        const notify = () => toast("Unsupported File Type.");
        notify();
        return;
      }

      const response = await fetch(url);
      if (!response.ok) {
        const notify = () =>
          toast(`Failed to fetch file. Status: ${response.status}`);
        notify();
        throw new Error(`Failed to fetch file. Status: ${response.status}`);
      }
      const blobData = await response.blob();

      const fileName = `data.${extenstion}`;
      const file = new File([blobData], fileName, {
        type: extenstion,
        lastModified: Date.now(),
      });
      setFile(file);
    } catch (error) {
      console.error(error);
      const notify = () =>
        toast(
          "Some error has been occured. Check console to see more details."
        );
      notify();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gray-100 p-4 overflow-x-hidden">
      {/* Github Link */}
      <a href="https://github.com/tier3guy/excel-to-json" target="__blank">
        <div className="fixed top-0 left-0 bg-black h-[150px] w-[150px] rotate-45 translate-y-[-50%] translate-x-[-50%]">
          <FontAwesomeIcon
            icon={faGithub as IconDefinition}
            className="text-white text-5xl rotate-[-90deg] translate-y-[110%] translate-x-[200%]"
          />
        </div>
      </a>

      <input
        type="file"
        ref={inputRef}
        name="fileInput"
        className="hidden"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/vnd.ms-Excel"
        onChange={onFileChangeHandler}
      />
      <div className="md:w-2/3 m-auto">
        <h1 className="text-center pb-5 text-3xl font-bold">
          Excel-to-JSON Converter
        </h1>
        <p className="text-center">
          Welcome to the Excel to JSON Converter, a powerful internal tool
          designed to streamline the process of converting Excel files into JSON
          format. This tool simplifies data transformation, making it easy for
          users to extract valuable insights from their spreadsheet data.
        </p>
        <p className="text-center mt-3">
          Note : Currently we are supporting only .csv, .xls and .xlsx files.
        </p>

        <div
          className="border-red-400 border-4 my-6 h-[200px] border-dashed flex items-center justify-center cursor-pointer"
          onClick={inputClickHandler}
        >
          {file ? (
            <div className="text-center flex flex-col gap-2">
              <p>Selected File : {file.name}</p>
              <p>OR</p>
              <p>Click again to change the file</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <FontAwesomeIcon
                icon={faCloudArrowUp as IconDefinition} // Adjust the type based on your FontAwesome version
                className="h-[50px] w-[50px]"
              />
              <p className="text-center">Click to Upload</p>
            </div>
          )}
        </div>

        <p className="text-center">OR</p>

        <div className="w-2/3 m-auto">
          <Input
            value={url}
            setValue={setUrl}
            placeholder="Paste the web URL of the sheet ..."
            icon={faArrowRightLong}
            onIconClick={onUrlEnter}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                onUrlEnter();
              }
            }}
          />
        </div>

        {file && !responseData && (
          <div className="flex justify-center mt-4">
            <Button
              label="Convert to JSON"
              onClick={onConvertFileClick}
              loading={loading}
            />
          </div>
        )}

        {responseData && (
          <ReactJsonViewer
            src={JSON.stringify(responseData, null, 2)}
            name={file ? (file?.name).split(".")[0] : null}
            cb={() => {
              setFile(null);
              setResponseData(null);
              setUrl("");
            }}
          />
        )}
      </div>

      <footer className="mt-10">
        <p className="text-center">
          Built with &#x1F9E1; by{" "}
          <a
            href="https://www.linkedin.com/in/avinash-gupta-3321041ba/"
            target="__blank"
            className="underline"
          >
            Avinash
          </a>{" "}
          at{" "}
          <a href="https://vils.ai" target="__blank" className="underline">
            vils.ai
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
