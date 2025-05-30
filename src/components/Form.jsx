import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Form = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    const savedFormData = JSON.parse(localStorage.getItem('formData'));

    if (savedLanguage) i18n.changeLanguage(savedLanguage);
    if (savedFormData) setFormData(savedFormData);
  }, [i18n]);

  const [formData, setFormData] = useState({
    client: '',
    truck: '',
    trailer: '',
    startTime: '',
    breakTime: { hours: 0, minutes: 0 },
    endTime: '',
    startKm: '',
    endKm: '',
    remarks: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === 'startKm' || name === 'endKm') && !/^\d*$/.test(value)) return;

    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    setTouched((prev) => ({ ...prev, [name]: true }));

    if (value.trim() !== '') {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }

    localStorage.setItem('formData', JSON.stringify(updatedFormData));
  };

  const handleBreakTimeChange = (e) => {
    const { name, value } = e.target;
    const updatedBreakTime = { ...formData.breakTime, [name]: value };
    const updatedFormData = { ...formData, breakTime: updatedBreakTime };
    setFormData(updatedFormData);
    localStorage.setItem('formData', JSON.stringify(updatedFormData));
  };

  const parseLocalDateTime = (dateTimeStr) => {
    const [datePart, timePart] = dateTimeStr.split('T');
    const [year, month, day] = datePart.split('-');
    const [hours, minutes] = timePart.split(':');
    return new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hours),
      parseInt(minutes)
    );
  };

  const isEndTimeValid = () => {
    const start = parseLocalDateTime(formData.startTime);
    const end = parseLocalDateTime(formData.endTime);
    return end > start;
  };

  const calculateTotalKm = () => {
    const start = parseInt(formData.startKm);
    const end = parseInt(formData.endKm);
    return isNaN(start) || isNaN(end) || end < start ? 0 : end - start;
  };

  const calculateTotalHours = () => {
    const { startTime, endTime, breakTime } = formData;
    if (!startTime || !endTime) return '0h 0m';

    const start = parseLocalDateTime(startTime);
    const end = parseLocalDateTime(endTime);
    let diffMs = end - start;
    if (isNaN(diffMs) || diffMs <= 0) return '0h 0m';

    const breakMs = ((parseInt(breakTime.hours || 0) * 60) + parseInt(breakTime.minutes || 0)) * 60 * 1000;
    diffMs -= breakMs;

    if (diffMs <= 0) return '0h 0m';

    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h ${minutes}m`;
  };

  const handleSubmit = () => {
    const newErrors = {};
    const requiredFields = ['client', 'truck', 'trailer', 'startTime', 'endTime', 'startKm', 'endKm'];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = t(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
      }
    });

    if (parseInt(formData.endKm) < parseInt(formData.startKm)) {
      newErrors.endKm = t('End KM must be greater than Start KM');
    }

    if (formData.startTime && formData.endTime && !isEndTimeValid()) {
      newErrors.endTime = t('End Time must be after Start Time');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const totalKm = calculateTotalKm();
    const totalHours = calculateTotalHours();

    const message = `${t('Client')}: ${formData.client}\n${t('Truck')}: ${formData.truck}\n${t('Trailer')}: ${formData.trailer}\n${t('Start Time')}: ${formData.startTime}\n${t('End Time')}: ${formData.endTime}\n${t('Break Time')}: ${formData.breakTime.hours}h ${formData.breakTime.minutes}m\n${t('Start KM')}: ${formData.startKm}\n${t('End KM')}: ${formData.endKm}\n${t('Total KM')}: ${totalKm}\n${t('Total Hours')}: ${totalHours}\n${t('Remarks')}: ${formData.remarks}`;

    const whatsappUrl = `https://wa.me/+31617457310?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const generatePDF = () => {
    if (!isEndTimeValid()) {
      setErrors((prev) => ({ ...prev, endTime: t('End Time must be after Start Time') }));
      return;
    }

    const doc = new jsPDF();
    doc.text(t('Driver Work Report'), 14, 16);
    autoTable(doc, {
      head: [[t('Field'), t('Value')]],
      body: [
        [t('Client'), formData.client],
        [t('Truck'), formData.truck],
        [t('Trailer'), formData.trailer],
        [t('Start Time'), formData.startTime],
        [t('End Time'), formData.endTime],
        [t('Break Time'), `${formData.breakTime.hours}h ${formData.breakTime.minutes}m`],
        [t('Start KM'), formData.startKm],
        [t('End KM'), formData.endKm],
        [t('Total KM'), calculateTotalKm()],
        [t('Total Hours'), calculateTotalHours()],
        [t('Remarks'), formData.remarks],
      ],
    });
    doc.save('driver_report.pdf');
  };

  const generateExcel = () => {
    if (!isEndTimeValid()) {
      setErrors((prev) => ({ ...prev, endTime: t('End Time must be after Start Time') }));
      return;
    }

    const data = [
      [t('Field'), t('Value')],
      [t('Client'), formData.client],
      [t('Truck'), formData.truck],
      [t('Trailer'), formData.trailer],
      [t('Start Time'), formData.startTime],
      [t('End Time'), formData.endTime],
      [t('Break Time'), `${formData.breakTime.hours}h ${formData.breakTime.minutes}m`],
      [t('Start KM'), formData.startKm],
      [t('End KM'), formData.endKm],
      [t('Total KM'), calculateTotalKm()],
      [t('Total Hours'), calculateTotalHours()],
      [t('Remarks'), formData.remarks],
    ];
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Report');
    XLSX.writeFile(wb, 'driver_report.xlsx');
  };

  return (
    <div className="form-container">
      <div className="language-switcher">
        <LanguageSwitcher />
      </div>

      <div className="form-content">
        <h1>{t('Driver Work Entry')}</h1>

        {['client', 'truck', 'trailer', 'startKm', 'endKm', 'remarks'].map((field) => (
          <div className="form-group" key={field}>
            <label>
              {field === 'startKm' ? t('Start KM') : field === 'endKm' ? t('End KM') : t(field.charAt(0).toUpperCase() + field.slice(1))}
            </label>
            <input
              type="text"
              inputMode={['startKm', 'endKm'].includes(field) ? 'numeric' : undefined}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={t(`Enter ${field}`)}
              required
            />
            {errors[field] && <div className="error-message">{errors[field]}</div>}
          </div>
        ))}

        <div className="form-group">
          <label>{t('Break Time')}</label>
          <div className="break-time-selector">
            <input
              type="number"
              name="hours"
              value={formData.breakTime.hours}
              onChange={handleBreakTimeChange}
              min="0"
              max="24"
              placeholder="Hours"
            />
            <span>{t('hours')}</span>
            <input
              type="number"
              name="minutes"
              value={formData.breakTime.minutes}
              onChange={handleBreakTimeChange}
              min="0"
              max="59"
              placeholder="Minutes"
            />
            <span>{t('minutes')}</span>
          </div>
        </div>

        <div className="form-group">
          <label>{t('Start Time')}</label>
          <input
            type="datetime-local"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
          {errors.startTime && <div className="error-message">{errors.startTime}</div>}
        </div>

        <div className="form-group">
          <label>{t('End Time')}</label>
          <input
            type="datetime-local"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
          {errors.endTime && <div className="error-message">{errors.endTime}</div>}
        </div>

        <div
          style={{
            margin: '15px 0',
            padding: '10px',
            backgroundColor: calculateTotalKm() === 0 && calculateTotalHours() === '0h 0m' ? '#eee' : '#e0f7fa',
            color: calculateTotalKm() === 0 && calculateTotalHours() === '0h 0m' ? '#999' : '#00796b',
            borderRadius: '5px',
            textAlign: 'center',
          }}
        >
          <strong>{t('Total KM')}:</strong> {calculateTotalKm()} km &nbsp; | &nbsp;
          <strong>{t('Total Time')}:</strong> {calculateTotalHours()}
        </div>

        <div className="button-row">
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
    </div>
  );
};

export default Form;
