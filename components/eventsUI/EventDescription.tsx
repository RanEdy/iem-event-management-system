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
import { ISectionFile } from "@/entities/ISectionFile";

type EventDescriptionProps = {
  event: IEvent;
  sections: (IEventSection & { files: ISectionFile[] })[];
  setSections: React.Dispatch<
    React.SetStateAction<(IEventSection & { files: ISectionFile[] })[]>
  >;
  onAddSection?: () => void;
  onRemoveSection?: (sectionIndex: number) => Promise<void>;
  onRemoveFile?: (sectionIndex: number, fileIndex: number) => void;
};

export const EventDescription: React.FC<EventDescriptionProps> = ({
  event,
  sections,
  setSections,
  onAddSection,
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

  // Default handlers when props not provided
  const defaultAddSection = (e: MouseEvent) => {
    e.preventDefault();
    if (sections.length < 5) {
      const nextId = sections.length ? Math.max(...sections.map(s => s.id)) + 1 : 1;
      const newSec: IEventSection & { files: ISectionFile[] } = {
        id: nextId,
        eventId: event.id,
        sectionName: `Section ${nextId}`,
        description: "",
        files: [],
      };
      setSections([...sections, newSec]);
      setActiveIdx(sections.length);
    }
  };

  const defaultRemoveSection = (e: MouseEvent, sectionIndex: number) => {
    e.stopPropagation();
    if (sections.length <= 1) {
      alert("The event needs at least 1 description section");
      return;
    }
    const updated = sections.filter((_, idx) => idx !== sectionIndex);
    setSections(updated);
    if (activeIdx >= updated.length) setActiveIdx(updated.length - 1);
    else if (sectionIndex === activeIdx) setActiveIdx(Math.max(0, activeIdx - 1));
  };

  const defaultRemoveFile = (e: MouseEvent, fileIdx: number) => {
    e.stopPropagation();
    const updated = [...sections];
    updated[activeIdx].files = updated[activeIdx].files.filter((_, idx) => idx !== fileIdx);
    setSections(updated);
  };

  // Section name edit handlers
  const handleStartEditName = (
    e: MouseEvent,
    section: IEventSection & { files: ISectionFile[] }
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
    if (!e.target.files) return;
    const filesArr = Array.from(e.target.files);
    const maxSize = 5 * 1024 * 1024;
    if (filesArr.some(f => f.size > maxSize)) {
      alert("Some files exceed 5MB and won't be added.");
      return;
    }
    const newFiles: ISectionFile[] = await Promise.all(
      filesArr.map(async file => {
        const buffer = await file.arrayBuffer();
        return { id: 0, sectionId: activeSection.id, name: file.name, dataBytes: Buffer.from(buffer) };
      })
    );
    const upd = [...sections];
    upd[activeIdx].files = [...upd[activeIdx].files, ...newFiles];
    setSections(upd);
  };

  // Create URL for blob
  const createFileUrl = (fileObj: ISectionFile) => {
    try {
      let blobData: Uint8Array;
      if (fileObj.dataBytes instanceof Buffer) blobData = new Uint8Array(fileObj.dataBytes);
      else if (fileObj.dataBytes instanceof Uint8Array) blobData = fileObj.dataBytes;
      else blobData = new Uint8Array(Array.isArray(fileObj.dataBytes) ? fileObj.dataBytes : Object.values(fileObj.dataBytes as any));
      const type = fileObj.name.endsWith(".pdf") ? "application/pdf" : "image/*";
      return URL.createObjectURL(new Blob([blobData], { type }));
    } catch {
      return "";
    }
  };

  return (
    <div className="mt-6 w-full">
      {/* Tabs */}
      <div className="flex items-center w-fit">
        {sections.map((sec, idx) => (
          <div
            key={sec.id}
            className={`flex items-center px-4 py-2 border-2 border-zinc-200 mr-1 ${
              idx === activeIdx
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
                <button onClick={e => { e.preventDefault(); setActiveIdx(idx); }} className="mr-2">
                  {sec.sectionName}
                </button>
                <button onClick={e => handleStartEditName(e, sec)}>
                  <FaEdit size={14} />
                </button>
                <button onClick={e => onRemoveSection ? (e.stopPropagation(), onRemoveSection(idx)) : defaultRemoveSection(e, idx)}>
                  <FaTimes size={14} />
                </button>
              </div>
            )}
          </div>
        ))}
        {sections.length < 5 && (
          <button onClick={onAddSection ? (e => (e.preventDefault(), onAddSection())) : defaultAddSection} className="p-2 border-2 border-zinc-200 bg-gray-100 rounded-md hover:border-zinc-400">
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

        <div className="mb-4">
          <input ref={fileInputRef} type="file" multiple accept="image/*,application/pdf" onChange={handleFilesChange} className="hidden" />
          <button type="button" onClick={handleFileButton} className="flex items-center border-2 px-4 py-2 rounded-md">
            <FaCloudUploadAlt className="mr-2" /> UPLOAD FILES
          </button>
          <p className="text-sm text-gray-500 mt-1">Only (.png, .jpg and .pdf)</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {activeSection.files.map((fileObj, i) => (
            <div key={i} className="relative border p-2 rounded-md">
              {fileObj.name.endsWith(".pdf") ? (
                <a href={createFileUrl(fileObj)} target="_blank" rel="noreferrer" className="block text-sm">
                  📄 {fileObj.name}
                </a>
              ) : (
                <img src={createFileUrl(fileObj)} alt={fileObj.name} className="h-24 object-cover rounded-md border" />
              )}
              <button
                onClick={e => onRemoveFile ? (e.stopPropagation(), onRemoveFile(activeIdx, i)) : defaultRemoveFile(e, i)}
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
