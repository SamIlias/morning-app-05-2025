import { useForm } from 'react-hook-form';
import * as React from 'react';
import { TaskType } from '../tasksList/TasksList.tsx';
import { useTranslation } from 'react-i18next';

export type TaskFormValues = Pick<TaskType, 'title' | 'deadline' | 'category' | 'description'>;

type PropsType = {
  closeAddForm: () => void;
  onSubmit: (data: TaskFormValues) => void;
  submitButtonText: string;
  defaultValues?: TaskFormValues;
};

export const taskCategories = {
  Default: 'default',
  Work: 'work',
  Daily: 'daily',
  Urgent: 'urgent',
  Shopping: 'shopping',
} as const;

export type TaskCategoryType = keyof typeof taskCategories;

// ------------------------------------- Component
export const BaseTaskForm: React.FC<PropsType> = ({
  closeAddForm,
  onSubmit,
  submitButtonText,
  defaultValues,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormValues>({ mode: 'onChange', defaultValues });

  const { t } = useTranslation('todopage');

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="col-span-2 row-span-6 grid grid-cols-2 gap-4 content-start"
    >
      {/* Title */}
      <div className="col-span-2">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          {t("baseTaksForm.titleLabel")}<span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          {...register('title', {
            required: 'Title is required',
            maxLength: {
              value: 30,
              message: 'Title must be at most 30 characters long',
            },
          })}
          placeholder={t("baseTaksForm.titlePlaceholder")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message as string}</p>
        )}
      </div>

      {/* Deadline */}
      <div>
        <label
          htmlFor="deadline"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          {t("baseTaksForm.deadlineLabel")}
        </label>
        <input
          id="deadline"
          {...register('deadline')}
          type="date"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      {/* Type */}
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          {t("baseTaksForm.categoryLabel")}
        </label>
        <select
          id="category"
          {...register('category')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          {(Object.keys(taskCategories) as TaskCategoryType[]).map((key) => (
            <option className="bg-lime-700/80" value={taskCategories[key]}>
              {key}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div className="col-span-2">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          {t("baseTaksForm.descriptionLabel")}
        </label>
        <textarea
          id="description"
          {...register('description')}
          placeholder={t("baseTaksForm.descriptionPlaceholder")}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      {/* Buttons */}
      <div className="col-span-2 flex justify-start mt-4">
        <button
          type="button"
          onClick={closeAddForm}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          {t("baseTaksForm.cancelButtonName")}
        </button>
        <input
          type="submit"
          value={submitButtonText}
          className="px-4 py-2 bg-blue-300 text-white font-medium rounded-md hover:bg-blue-800 cursor-pointer"
        />
      </div>
    </form>
  );
};
