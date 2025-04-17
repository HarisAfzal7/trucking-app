import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Form = () => {
  const { t, i18n } = useTranslation();

  const [formData, setFormData] = useState({
    client: '',
    truck: '',
    trailer: '',
    startTime: '',
    breakTime: '',
    endTime: '',
    startKm: '',
    endKm: '',
    remarks: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const { client, truck, trailer, startTime, breakTime, endTime, startKm, endKm, remarks } = formData;
    const totalKm = parseInt(endKm || 0) - parseInt(startKm || 0);
    const totalHours = ((new Date(endTime) - new Date(startTime)) / (1000 * 60 * 60)).toFixed(2);

    const message = `${t('Client')}: ${client}\n${t('Truck')}: ${truck}\n${t('Trailer')}: ${trailer}\n${t('Start Time')}: ${startTime}\n${t('End Time')}: ${endTime}\n${t('Break Time')}: ${breakTime}\n${t('Start KM')}: ${startKm}\n${t('End KM')}: ${endKm}\n${t('Total KM')}: ${totalKm}\n${t('Total Hours')}: ${totalHours}\n${t('Remarks')}: ${remarks}`;

    const whatsappUrl = `https://wa.me/11234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const generatePDF = () => {
    const { client, truck, trailer, startTime, breakTime, endTime, startKm, endKm, remarks } = formData;
    const totalKm = parseInt(endKm || 0) - parseInt(startKm || 0);
    const totalHours = ((new Date(endTime) - new Date(startTime)) / (1000 * 60 * 60)).toFixed(2);

    const doc = new jsPDF();
    doc.text(t('Driver Work Report'), 14, 16);
    autoTable(doc, {
      head: [[t('Field'), t('Value')]],
      body: [
        [t('Client'), client],
        [t('Truck'), truck],
        [t('Trailer'), trailer],
        [t('Start Time'), startTime],
        [t('End Time'), endTime],
        [t('Break Time'), breakTime],
        [t('Start KM'), startKm],
        [t('End KM'), endKm],
        [t('Total KM'), totalKm],
        [t('Total Hours'), totalHours],
        [t('Remarks'), remarks],
      ],
    });
    doc.save('driver_report.pdf');
  };

  const generateExcel = () => {
    const { client, truck, trailer, startTime, breakTime, endTime, startKm, endKm, remarks } = formData;
    const totalKm = parseInt(endKm || 0) - parseInt(startKm || 0);
    const totalHours = ((new Date(endTime) - new Date(startTime)) / (1000 * 60 * 60)).toFixed(2);

    const data = [
      [t('Field'), t('Value')],
      [t('Client'), client],
      [t('Truck'), truck],
      [t('Trailer'), trailer],
      [t('Start Time'), startTime],
      [t('End Time'), endTime],
      [t('Break Time'), breakTime],
      [t('Start KM'), startKm],
      [t('End KM'), endKm],
      [t('Total KM'), totalKm],
      [t('Total Hours'), totalHours],
      [t('Remarks'), remarks],
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Report');
    XLSX.writeFile(wb, 'driver_report.xlsx');
  };

  return (
    <div className="form-container">
      {/* Language Switcher */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <LanguageSwitcher />
      </div>

      <div className="form-content">
        <h1>{t('Driver Work Entry')}</h1>

        <div className="form-group">
          <label>{t('Client')}</label>
          <input type="text" name="client" value={formData.client} onChange={handleChange} placeholder={t('Enter client name')} />
        </div>

        <div className="form-group">
          <label>{t('Truck')}</label>
          <input type="text" name="truck" value={formData.truck} onChange={handleChange} placeholder={t('Enter truck number')} />
        </div>

        <div className="form-group">
          <label>{t('Trailer')}</label>
          <input type="text" name="trailer" value={formData.trailer} onChange={handleChange} placeholder={t('Enter trailer number')} />
        </div>

        <div className="form-group">
          <label>{t('Start Time')}</label>
          <input type="datetime-local" name="startTime" value={formData.startTime} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>{t('Break Time')}</label>
          <input type="text" name="breakTime" value={formData.breakTime} onChange={handleChange} placeholder={t('Enter break time (e.g., 30 min)')} />
        </div>

        <div className="form-group">
          <label>{t('End Time')}</label>
          <input type="datetime-local" name="endTime" value={formData.endTime} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>{t('Start KM')}</label>
          <input type="number" name="startKm" value={formData.startKm} onChange={handleChange} placeholder={t('Enter start km')} />
        </div>

        <div className="form-group">
          <label>{t('End KM')}</label>
          <input type="number" name="endKm" value={formData.endKm} onChange={handleChange} placeholder={t('Enter end km')} />
        </div>

        <div className="form-group">
          <label>{t('Remarks')}</label>
          <textarea name="remarks" value={formData.remarks} onChange={handleChange} placeholder={t('Enter remarks')} />
        </div>

        <button className="whatsapp-btn" onClick={handleSubmit}>
          <i className="fa fa-share-alt"></i> {t('Send via WhatsApp')}
        </button>
        <button className="pdf-btn" onClick={generatePDF}>
          <i className="fa fa-file-pdf"></i> {t('Download PDF')}
        </button>
        <button className="excel-btn" onClick={generateExcel}>
          <i className="fa fa-file-excel"></i> {t('Download Excel')}
        </button>
      </div>
    </div>
  );
};

export default Form;
