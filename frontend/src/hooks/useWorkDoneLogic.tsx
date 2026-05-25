// features/reports/hooks/useWorkDoneLogic.ts
import { useState } from 'react';
import { type UseFormSetValue, type UseFormTrigger } from 'react-hook-form';
import { WORK_OPTIONS } from '../types/constants/workDoneOptions.constants';
import { type ReportFormData } from '../types/reports/reports.types';

export const useWorkDoneLogic = (
  setValue: UseFormSetValue<ReportFormData>,
  trigger: UseFormTrigger<ReportFormData>
) => {
  const [selectedWork, setSelectedWork] = useState('');
  const [customWorkText, setCustomWorkText] = useState('');

  const handleWorkChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedWork(value);

    if (value !== 'otro') {
      const selectedLabel = WORK_OPTIONS.find(t => t.value === value)?.label || '';
      setValue('workDone', selectedLabel);
      trigger('workDone');
      setCustomWorkText('');
    } else {
      setValue('workDone', '');
      trigger('workDone');
    }
  };

  const handleCustomTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomWorkText(value);
    setValue('workDone', value);
    trigger('workDone');
  };

  const resetWorkDone = () => {
    setSelectedWork('');
    setCustomWorkText('');
    setValue('workDone', '');
  };

  return {
    selectedWork,
    customWorkText,
    handleWorkChange,
    handleCustomTextChange,
    resetWorkDone,
    showCustomInput: selectedWork === 'otro',
  };
};