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
import { useRequests } from '@/context/RequestContext';
import { Request } from '@/types/request';

export default function RequestInputs() {
  const { addRequest, isLoading } = useRequests();
  const [formData, setFormData] = useState<Omit<Request, 'id'>>({
    module: '',
    name: '',
    priority: '', // Set default value
    description: '',
    status: '', // Set default value
    relation: '',
    createdAt: new Date().toISOString().split('T')[0], // Set default to today
    requestedBy: '',
    notes: '',
    reference: null,
  });

  const [errors, setErrors] = useState<Partial<Omit<Request, 'id'>>>({});

  const optionsPriority = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
  ];

  const optionsStatus = [
    { value: "Dalam Review", label: "Dalam Review" },
    { value: "Blocked", label: "Blocked" },
    { value: "Di Setujui", label: "Di Setujui" },
    { value: "Draft", label: "Draft" },
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<Omit<Request, 'id'>> = {};
    
    if (!formData.module.trim()) {
      newErrors.module = 'Modul/Halaman wajib diisi';
    }
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nama Kebutuhan wajib diisi';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Deskripsi wajib diisi';
    }
    
    if (!formData.requestedBy.trim()) {
      newErrors.requestedBy = 'Requestor wajib diisi';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleTextAreaChange = (name: string) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        reference: file
      }));
    }
  };

  const handleDateChange = (dates: Date[], dateString: string) => {
    setFormData(prev => ({
      ...prev,
      createdAt: dateString
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    addRequest(formData);
    
    // Reset form
    setFormData({
      module: '',
      name: '',
      priority: 'low',
      description: '',
      status: 'draft',
      relation: '',
      createdAt: new Date().toISOString().split('T')[0],
      requestedBy: '',
      notes: '',
      reference: null,
    });
  };

  return (
    <ComponentCard title="Request Inputs">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Modul/Halaman Input */}
        <div>
          <Label>Modul/Halaman</Label>
          <Input 
            type="text" 
            name="module"
            defaultValue={formData.module}
            onChange={handleInputChange}
            placeholder="Masukkan Modul/Halaman"
            // error={errors.module}
          />
        </div>

        {/* Nama Kebutuhan Input */}
        <div>
          <Label>Nama Kebutuhan</Label>
          <Input 
            type="text" 
            name="name"
            defaultValue={formData.name}
            onChange={handleInputChange}
            placeholder="Masukkan Kebutuhan"
            // error={errors.name}
          />
        </div>

        {/* Deskripsi TextArea */}
        <div>
          <Label>Deskripsi</Label>
          <TextArea
            value={formData.description}
            onChange={handleTextAreaChange('description')}
            rows={6}
            placeholder='Masukkan Deskripsi Kebutuhan'
            // error={errors.description}
          />
        </div>

        {/* Prioritas Select */}
        <div>
          <Label>Prioritas</Label>
          <div className="relative">
            <Select
              options={optionsPriority}
              placeholder="Pilih Prioritas"
              onChange={handleSelectChange('priority')}
              defaultValue={formData.priority}
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
              placeholder="Pilih Status"
              onChange={handleSelectChange('status')}
              defaultValue={formData.status}
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
          <Input 
            type="text" 
            name="relation"
            defaultValue={formData.relation}
            onChange={handleInputChange}
            placeholder="Masukkan Relasi" 
          />
        </div>

        {/* Tanggal Buat DatePicker */}
        <div>
          <DatePicker
            id="date-picker"
            label="Tanggal Buat"
            placeholder="Pilih Tanggal"
            onChange={handleDateChange}
            // defaultDate={formData.createdAt ? new Date(formData.createdAt) : null}
          />
        </div>

        {/* Di Request Oleh Input */}
        <div>
          <Label>Di Request Oleh</Label>
          <Input 
            type="text" 
            name="requestedBy"
            defaultValue={formData.requestedBy}
            onChange={handleInputChange}
            placeholder="Masukkan Requestor"
            // error={errors.requestedBy}
          />
        </div>

        {/* Catatan TextArea */}
        <div>
          <Label>Catatan</Label>
          <TextArea
            value={formData.notes}
            onChange={handleTextAreaChange('notes')}
            rows={6}
            placeholder='Masukkan Catatan'
          />
        </div>

        {/* Referensi FileInput */}
        <div>
          <Label>Referensi</Label>
          <FileInput 
            onChange={handleFileChange} 
            className="custom-class"
          />
          {formData.reference && (
            <p className="mt-1 text-sm text-gray-500">
              File terpilih: {formData.reference.name}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`flex items-center justify-center p-3 font-medium text-white rounded-lg bg-brand-500 text-theme-sm hover:bg-brand-600 mt-14 w-full ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Menyimpan...' : 'Submit'}
        </button>
      </form>
    </ComponentCard>
  );
}