"use client";
import React, { useState } from 'react';
import ComponentCard from '../../common/ComponentCard';
import Label from '../Label';
import Input from '../input/InputField';
import Select from '../Select';
import { ChevronDownIcon } from '../../../icons';
import DatePicker from '@/components/form/date-picker';
import TextArea from '../input/TextArea';
import FileInput from '../input/FileInput';

export default function RequestInputs() {
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const handleSelectChangeStatus = (value: string) => {
    console.log("Selected value:", value);
  };

  const optionsPriority = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];
  const handleSelectChangePriority = (value: string) => {
    console.log("Selected value:", value);
  };

  const optionsStatus = [
    { value: "dalam review", label: "Dalam Review" },
    { value: "blocked", label: "Blocked" },
    { value: "di setujui", label: "Di Setujui" },
    { value: "draft", label: "Draft" },
  ];
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        console.log("Selected file:", file.name);
      }
    };
  return (
    <ComponentCard title="Request Inputs">
      <div className="space-y-6">

        {/* ID Input */}
        <div>
          <Label>ID</Label>
          <Input type="text" placeholder='Masukkan ID Request'/>
        </div>

        {/* Modul/Halaman Input */}
        <div>
          <Label>Modul/Halaman</Label>
          <Input type="text" placeholder="Masukkan Modul/Halaman" />
        </div>

        {/* Nama Kebutuhan Input */}
        <div>
          <Label>Nama Kebutuhan</Label>
          <Input type="text" placeholder="Masukkan Kebutuhan" />
        </div>

        {/* Deskripsi TextArea */}
        <div>
          <Label>Deskripsi</Label>
          <TextArea
            value={description}
            onChange={(value) => setDescription(value)}
            rows={6}
            placeholder='Masukkan Deskripsi Kebutuhan'
          />
        </div>

        {/* Prioritas Select */}
        <div>
          <Label>Prioritas</Label>
          <div className="relative">
            <Select
            options={optionsPriority}
            placeholder="Select an option"
            onChange={handleSelectChangePriority}
            className="dark:bg-dark-900"
          />
             <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon/>
            </span>
          </div>
        </div>

        {/* Status Select */}
        <div>
          <Label>Status</Label>
          <div className="relative">
            <Select
            options={optionsStatus}
            placeholder="Select an option"
            onChange={handleSelectChangeStatus}
            className="dark:bg-dark-900"
          />
             <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon/>
            </span>
          </div>
        </div>

        {/* Relasi Input */}
        <div>
          <Label>Relasi</Label>
          <Input type="text" placeholder="Masukkan Relasi" />
        </div>

        {/* Tanggal Buat DatePicker */}
        <div>
          <DatePicker
            id="date-picker"
            label="Tanggal Buat"
            placeholder="Select a date"
            onChange={(dates, currentDateString) => {
              // Handle your logic
              console.log({ dates, currentDateString });
            }}
          />
        </div>

        {/* Di Request Oleh Input */}
        <div>
          <Label>Di Request Oleh</Label>
          <Input type="text" placeholder="Masukkan Requestor" />
        </div>

        {/* Catatan TextArea */}
        <div>
          <Label>Catatan</Label>
          <TextArea
            value={notes}
            onChange={(value) => setNotes(value)}
            rows={6}
            placeholder='Masukkan Catatan'
          />
        </div>

        {/* Referensi FileInput */}
        <div>
          <Label>Referensi</Label>
          <FileInput onChange={handleFileChange} className="custom-class" />
        </div>
      </div>
    </ComponentCard>
  );
}
