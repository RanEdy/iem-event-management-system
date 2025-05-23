"use client";

import React, { useState, MouseEvent, ChangeEvent, useRef } from "react";
import {
  FaCloudUploadAlt,
  FaPlus,
  FaTimes,
  FaEdit,
  FaCheck,
} from "react-icons/fa";
import { IEvent } from "@/entities/IEvent";
import { IEventSection } from "@/entities/IEventSection";
import { EditableFile } from "./EventEditForm";

type EventEditDescriptionProps = {
  event: IEvent;
  sections: (IEventSection & { files: EditableFile[] })[];
  setSections: React.Dispatch<
    React.SetStateAction<(IEventSection & { files: EditableFile[] })[]>
  >;
  onRemoveSection?: (sectionIndex: number) => Promise<void>;
  onRemoveFile?: (sectionIndex: number, fileIndex: number) => void;
};

export const EventEditDescription: React.FC<EventEditDescriptionProps> = ({
  event,
  sections,
  setSections,
  onRemoveSection,
  onRemoveFile,
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeSection = sections[activeIdx];
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Section name editing
  const [editingSectionId, setEditingSectionId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

  const handleFileButton = () => fileInputRef.current?.click();

  // Add new section
  const handleAddSection = (e: MouseEvent) => {
    e.preventDefault();
    if (sections.length < 5) {
      const nextId = Date.now(); // Temporal ID for new sections
      const newSec: IEventSection & { files: EditableFile[] } = {
        id: nextId,
        eventId: event.id,
        sectionName: `Section ${sections.length + 1}`,
        description: "",
        files: [],
      };
      setSections([...sections, newSec]);
      setActiveIdx(sections.length);
    }
  };

  // Remove section
  const handleRemoveSection = async (e: MouseEvent, sectionIndex: number) => {
    e.stopPropagation();
    if (sections.length <= 1) {
      alert("The event needs at least 1 description section");
      return;
    }
    
    if (onRemoveSection) {
      await onRemoveSection(sectionIndex);
    } else {
      const updated = sections.filter((_, idx) => idx !== sectionIndex);
      setSections(updated);
    }
    
    if (activeIdx >= sections.length - 1) {
      setActiveIdx(Math.max(0, sections.length - 2));
    } else if (sectionIndex === activeIdx) {
      setActiveIdx(Math.max(0, activeIdx - 1));
    }
  };

  // Remove file
  const handleRemoveFile = (e: MouseEvent, fileIdx: number) => {
    e.stopPropagation();
    if (onRemoveFile) {
      onRemoveFile(activeIdx, fileIdx);
    } else {
      const updated = [...sections];
      updated[activeIdx].files = updated[activeIdx].files.filter((_, idx) => idx !== fileIdx);
      setSections(updated);
    }
  };

  // Section name edit handlers
  const handleStartEditName = (
    e: MouseEvent,
    section: IEventSection & { files: EditableFile[] }
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingSectionId(section.id);
    setEditingName(section.sectionName);
  };

  const handleSaveSectionName = (e: MouseEvent, sectionId: number) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = sections.map(sec =>
      sec.id === sectionId
        ? { ...sec, sectionName: editingName || `Section ${sectionId}` }
        : sec
    );
    setSections(updated);
    setEditingSectionId(null);
  };

  const handleNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditingName(e.target.value);
  };

  const handleNameInputKeyPress = (
    e: React.KeyboardEvent,
    sectionId: number
  ) => {
    if (e.key === "Enter") {
      handleSaveSectionName(e as unknown as MouseEvent, sectionId);
    }
  };

  // Description change
  const handleDescChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 3000) {
      const upd = [...sections];
      upd[activeIdx].description = e.target.value;
      setSections(upd);
    }
  };

  // File upload
  const handleFilesChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || activeSection === undefined) return;
    const filesArr = Array.from(e.target.files);
    const maxSize = 5 * 1024 * 1024;

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    const validated: EditableFile[] = [];

    for (const file of filesArr) {
      if (!allowedTypes.includes(file.type)) {
        alert("Only PDF, JPG, PNG allowed: " + file.name);
        continue;
      }
      if (file.size > maxSize) {
        alert("File too large: " + file.name);
        continue;
      }

      validated.push({
        id: Date.now() + Math.random(), // temporal id
        sectionId: activeSection.id,
        name: file.name,
        url: URL.createObjectURL(file),
        file: file,
        isNew: true,
      });
    }

    const updated = [...sections];
    updated[activeIdx].files = [...updated[activeIdx].files, ...validated];
    setSections(updated);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="mt-6 w-full">
      {/* Tabs */}
      <div className="flex items-center w-fit">
        {sections.map((sec, idx) => (
          <div
            key={sec.id}
            className={`flex items-center px-4 py-2 border-2 border-zinc-200 mr-1 ${idx === activeIdx
              ? "bg-white border-b-0 text-gray-800 rounded-t-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
          >
            {editingSectionId === sec.id ? (
              <div onClick={e => e.stopPropagation()} className="flex items-center">
                <input
                  value={editingName}
                  onChange={handleNameInputChange}
                  onKeyUp={e => handleNameInputKeyPress(e, sec.id)}
                  className="mr-2 px-1 border text-sm rounded"
                  autoFocus
                />
                <button onClick={e => handleSaveSectionName(e, sec.id)}>
                  <FaCheck size={14} />
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <button
                  onClick={e => { e.preventDefault(); setActiveIdx(idx); }}
                  className="mr-2"
                >
                  {sec.sectionName}
                </button>
                <button
                  onClick={e => handleStartEditName(e, sec)}
                  className="mr-1"
                >
                  <FaEdit size={14} />
                </button>
                <button onClick={e => handleRemoveSection(e, idx)}>
                  <FaTimes size={14} />
                </button>
              </div>
            )}
          </div>
        ))}
        {sections.length < 5 && (
          <button onClick={e => handleAddSection(e)} className="p-2 border-2 border-zinc-200 bg-gray-100 rounded-md hover:border-zinc-400">
            <FaPlus />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="border-2 border-zinc-200 border-t-0 bg-white rounded-b-md p-4">
        <textarea
          className="w-full h-40 p-2 border-2 rounded-md mb-4"
          value={activeSection?.description || ""}
          onChange={handleDescChange}
        />

        {/* UPLOAD FILES */}
        <div className="mb-4">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,application/pdf"
            onChange={handleFilesChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={handleFileButton}
            className="flex items-center border-2 px-4 py-2 rounded-md"
          >
            <FaCloudUploadAlt className="mr-2" /> UPLOAD FILES
          </button>
          <p className="text-sm text-gray-500 mt-1">Only (.png, .jpg and .pdf)</p>
        </div>

        {/* FILES */}
        <div className="grid grid-cols-3 gap-4">
          {activeSection?.files?.map((fileObj, i) => (
            <div key={i} className="relative border p-2 rounded-md">
              {fileObj.name.endsWith(".pdf") ? (
                <a href={fileObj.url} target="_blank" rel="noreferrer" className="block text-sm">
                  📄 {fileObj.name}
                </a>
              ) : (
                <img src={fileObj.url} alt={fileObj.name} className="h-24 object-cover rounded-md border" />
              )}
              <button
                onClick={e => handleRemoveFile(e,i)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
              >
                <FaTimes size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
                