"use client";

import React, { useState, MouseEvent, ChangeEvent, useRef } from 'react';
import { FaCloudUploadAlt, FaPlus, FaTimes, FaEdit, FaCheck } from 'react-icons/fa';
import { IEvent } from '@/entities/IEvent';
import { IEventSection } from '@/entities/IEventSection';
import { ISectionFile } from '@/entities/ISectionFile';

type EventDescriptionProps = {
    event: IEvent;
    sections: (IEventSection & { files: ISectionFile[] })[];
    setSections: React.Dispatch<React.SetStateAction<(IEventSection & { files: ISectionFile[] })[]>>;
};
  
export const EventDescription: React.FC<EventDescriptionProps> = ({event, sections, setSections}) =>
{

  const [activeIdx, setActiveIdx] = useState(0);
  const activeSection = sections[activeIdx];
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State for editing the section name
  const [editingSectionId, setEditingSectionId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

  const handleFileButton = () => fileInputRef.current?.click();

  // Add new section
  const handleAddSection = (e: MouseEvent) => {
    e.preventDefault();
    if (sections.length < 5)
    {
      const nextId = Math.max(...sections.map((s) => s.id)) + 1;
      const newSec: IEventSection & { files: ISectionFile[] } = {
        id: nextId,
        eventId: event.id,
        sectionName: `Section ${nextId}`,
        description: "",
        files: [],
      };
      setSections([...sections, newSec]);
      setActiveIdx(sections.length);
      console.log(sections);
    }
  };

  // Select tab
  const handleSelect = (e: MouseEvent, idx: number) =>
  {
    e.preventDefault();
    setActiveIdx(idx);
  };

  // Delete section
  const handleDeleteSection = (e: MouseEvent, sectionIndex: number) => {
    e.stopPropagation(); // Prevent tab selection when deleting

    if (sections.length <= 1) {
      alert("The event needs at least 1 description section");
      return;
    }

    const updatedSections = sections.filter((_, idx) => idx !== sectionIndex);
    setSections(updatedSections);

    // Adjust active index if needed
    if (activeIdx >= updatedSections.length) {
      setActiveIdx(updatedSections.length - 1);
    } else if (sectionIndex === activeIdx) {
      setActiveIdx(Math.max(0, activeIdx - 1));
    }

    console.log(sections)
  };

  // Start editing section name
  const handleStartEditName = (e: MouseEvent, section: IEventSection & { files: ISectionFile[] }) => {
    e.preventDefault()
    e.stopPropagation(); // Prevent tab selection when editing
    setEditingSectionId(section.id);
    setEditingName(section.sectionName);
  };

  // Save section name
  const handleSaveSectionName = (e: MouseEvent, sectionId: number) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent tab selection when saving
    const updatedSections = sections.map(section =>
      section.id === sectionId
        ? { ...section, sectionName: editingName || `Section ${section.id}` }
        : section
    );
    setSections(updatedSections);
    setEditingSectionId(null);
  };

  // Handle name input change
  const handleNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditingName(e.target.value);
  };

  // Handle name input keypress (save on Enter)
  const handleNameInputKeyPress = (e: React.KeyboardEvent, sectionId: number) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      handleSaveSectionName(e as unknown as MouseEvent, sectionId);
    }
  };

  // Change description
  const handleDescChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 3000)
    {
      const upd = [...sections];
      upd[activeIdx].description = e.target.value;
      setSections(upd);
    }
  };

  // File management using ISectionFile
  const handleFilesChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArr = Array.from(e.target.files);

    //5 MB (5 * 1024 * 1024 bytes)
    const maxSize = 5 * 1024 * 1024;
    const oversizedFiles = filesArr.filter(file => file.size > maxSize);

    //Oversize valdiation
    if (oversizedFiles.length > 0) {
      alert("Some files have a size more than 5 MB and will not be submitted.");
      return;
    }
    const newFiles: ISectionFile[] = await Promise.all(
      filesArr.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        return {
          id: 0, // temporal
          sectionId: activeSection.id,
          name: file.name,
          dataBytes: Buffer.from(arrayBuffer),
        };
      })
    );
    const upd = [...sections];
    upd[activeIdx].files = [...upd[activeIdx].files, ...newFiles];
    setSections(upd);
    console.log(sections);
  };

  // Function for creating the URL for files
  const createFileUrl = (fileObj: ISectionFile) => {
    // Handle both client-side Buffer and server-side Prisma Bytes
    let blobData: Uint8Array;

    try {
      if (fileObj.dataBytes instanceof Buffer) {
        // Cast Buffer to Uint8Array
        blobData = new Uint8Array(fileObj.dataBytes);
      } else if (fileObj.dataBytes instanceof Uint8Array) {
        // If was an Uint8Array use directly
        blobData = fileObj.dataBytes;
      } else if (typeof fileObj.dataBytes === 'object') {
        // For serializable data
        // Cast Uint8Array
        if (Array.isArray(fileObj.dataBytes)) {
          blobData = new Uint8Array(fileObj.dataBytes);
        } else {
          // If is an object same as array (as prisma returns)
          blobData = new Uint8Array(Object.values(fileObj.dataBytes as any));
        }
      } else {
        console.error('DataBytes Format not supported:', typeof fileObj.dataBytes);
        return ''; // Return empty string for not supported formats
      }

      const type = fileObj.name.endsWith('.pdf') ? 'application/pdf' : 'image/*';
      const blob = new Blob([blobData], { type });
      return URL.createObjectURL(blob);
    } catch (e) {
      console.error('Error creating blob:', e, 'Data Types:', typeof fileObj.dataBytes);
      return ''; // Return empty URL if blob creation fails
    }
  };

  // Function for deleting a file in the section
  const handleDeleteFile = (e: MouseEvent, fileIdx: number) => {
    e.stopPropagation();
    const upd = [...sections];
    upd[activeIdx].files = upd[activeIdx].files.filter((_, idx) => idx !== fileIdx);
    setSections(upd);
  };

  return (
    <div className="mt-6 w-full">
      {/* Tabs */}
      <div className="flex items-center w-fit">
        {sections.map((sec, idx) => (
          <div
            key={sec.id}
            className={
              "flex items-center px-4 py-2 border-2 border-zinc-200 " +
              (idx === activeIdx
                ? "bg-white border-b-0 text-gray-800 rounded-t-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200") +
              " mr-1"
            }
          >
            {editingSectionId === sec.id ? (
              // Editing state
              <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
                <input
                  type="text"
                  value={editingName}
                  onChange={handleNameInputChange}
                  onKeyUp={(e) => handleNameInputKeyPress(e, sec.id)}
                  className="mr-2 px-1 border border-gray-400 text-sm rounded"
                  autoFocus
                />
                <button
                  onClick={(e) => handleSaveSectionName(e, sec.id)}
                  className="text-green-600 hover:text-green-800"
                >
                  <FaCheck size={14} />
                </button>
              </div>
            ) : (
              // Normal state
              <div className="flex items-center">
                <button
                  onClick={(e) => handleSelect(e, idx)}
                  className="mr-2"
                >
                  {sec.sectionName}
                </button>
                <button
                  onClick={(e) => handleStartEditName(e, sec)}
                  className="text-gray-500 hover:text-blue-600 mr-1"
                >
                  <FaEdit size={14} />
                </button>
                <button
                  onClick={(e) => handleDeleteSection(e, idx)}
                  className="text-gray-500 hover:text-red-600"
                >
                  <FaTimes size={14} />
                </button>
              </div>
            )}
          </div>
        ))}
        {/** Add section button */
          sections.length < 5 &&
          <button
          onClick={handleAddSection}
          className="p-2 border-2 border-zinc-200 bg-gray-100 rounded-md hover:border-zinc-400">
          <FaPlus />
        </button>
        }
        
      </div>

      {/* Content Active Section */}
      <div className="border-2 border-zinc-200 border-t-0 bg-white rounded-b-md p-4">
        <textarea
          className="w-full h-40 p-2 border-2 border-gray-300 rounded-md mb-4 resize-none overflow-y-auto"
          value={activeSection?.description ?? ""}
          onChange={handleDescChange}
          placeholder="Event description..."
        />

        {/* UPLOAD FILE BUTTON */}
        <div className="mb-4 justify-items-end">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,application/pdf"
            onChange={handleFilesChange}
            className='hidden'
          />
          {/* BUTTON */}
          <button
            type="button"
            onClick={handleFileButton}
            className="flex items-center border-2 px-4 py-2 bg-zinc-200 font-bold text-zinc-400 rounded-md hover:bg-zinc-300 hover:border-2 hover:border-zinc-400 transition-colors"
          >
            <FaCloudUploadAlt className="mr-2 text-lg" />
            UPLOAD FILES
          </button>

          {/* Optional Message */}
          <p className="text-sm text-gray-500 mt-1">
            Only (.png, .jpg and .pdf)
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {activeSection.files.map((fileObj, i) => {
            const url = createFileUrl(fileObj);

            return (
              <div key={i} className="relative border p-2 rounded-md">
                {fileObj.name.endsWith('.pdf') ? (
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-sm"
                  >
                    📄 {fileObj.name}
                  </a>
                ) : (
                  <img
                    src={url}
                    alt={fileObj.name}
                    className="h-24 object-cover rounded-md border"
                    onError={(e) => {
                      console.error('Error loading image:', fileObj.name);
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,...';
                    }}
                  />
                )}

                {/* Delete File button */}
                <button
                  onClick={(e) => handleDeleteFile(e,i)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};