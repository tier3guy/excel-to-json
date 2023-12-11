"use client";

// Internal Imports
import React, { useRef, SyntheticEvent, useState, ChangeEvent } from "react";

// External Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";

// Components Imports
import Button from "@/components/Button";

/**
 * @name - Home Component
 * @author - Avinash Gupta
 * @description - The main component for the Excel to JSON Converter app.
 */
const Home: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-100 p-4">
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        onChange={onFileChangeHandler}
      />
      <div className="md:w-2/3 m-auto">
        <h1 className="text-center py-5 text-3xl font-bold">
          Excel-to-JSON Converter
        </h1>
        <p className="text-center">
          Welcome to the Excel to JSON Converter, a powerful internal tool
          designed to streamline the process of converting Excel files into JSON
          format. This tool simplifies data transformation, making it easy for
          users to extract valuable insights from their spreadsheet data.
        </p>

        <div
          className="border-red-400 border-4 my-6 h-[200px] border-dashed flex items-center justify-center cursor-pointer"
          onClick={inputClickHandler}
        >
          {file ? (
            <p>{file.name}</p>
          ) : (
            <FontAwesomeIcon
              icon={faCloudArrowUp as IconDefinition} // Adjust the type based on your FontAwesome version
              className="h-[50px] w-[50px]"
            />
          )}
        </div>

        {file && (
          <div className="flex justify-center">
            <Button label="Convert to JSON" onClick={onConvertFileClick} />
          </div>
        )}
      </div>
      <footer className="fixed bottom-0 w-screen">
        <p className="text-center">
          Built with &#x1F9E1; by{" "}
          <a href="mailto:avinash.gupta@vils.ai" className="underline">
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
