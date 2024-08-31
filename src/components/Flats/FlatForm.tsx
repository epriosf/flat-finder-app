import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// import GeneralInput from '../components/Commons/Inputs/GeneralInput';
// import { Flat } from '../components/Interfaces/FlatInterface';
// import { uploadFlatImage, createFlat } from '../services/firebase';
// import FormErrorMessage from '../components/Commons/Inputs/MessageErrors';
import { InputSwitch, InputSwitchChangeEvent } from 'primereact/inputswitch';
import { FileUpload, FileUploadHandlerEvent } from 'primereact/fileupload';
import { Calendar } from 'primereact/calendar';
import { FloatLabel } from 'primereact/floatlabel';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Timestamp } from 'firebase/firestore';
import FormErrorMessage from '../Commons/Inputs/MessageErrors';
import GeneralInput from '../Commons/Inputs/GeneralInput';
import { createFlat, uploadFlatImage } from '../../services/firebase';
import { Flat } from '../Interfaces/FlatInterface';
import { useAuth } from '../../hooks/useAuth';

const today = new Date();
// const todayYear = new Date().getFullYear();
let minDate = new Date(today);
let maxDate = new Date(today);
const currentYear = new Date().getFullYear();
const minYearDate = new Date(1900, 0, 1);
const maxYearDate = new Date(new Date().getFullYear(), 11, 31); // Current year

maxDate.setFullYear(today.getFullYear() + 2);

// Validation schema for the flat form
const FlatSchema = Yup.object({
  areaSize: Yup.number().nullable().required('Area Size Required'),
  city: Yup.string().required('City Required'),
  // dateAvailable: Yup.date().required('Date Available Required'),
  dateAvailable: Yup.date()
    .required('Date Available Required')
    .min(minDate, 'Date needs to be in the future')
    .max(maxDate, 'Date can not be more than 2 years in the future'),
  hasAc: Yup.boolean().required('AC Requirement Required'),
  price: Yup.number().nullable().required('Price Required'),
  streetName: Yup.string().required('Street Name Required'),
  streetNumber: Yup.number().nullable().required('Street Number Required'),
  yearBuilt: Yup.number()
    .nullable()
    .min(1900, 'Year Built must be after 1900')
    .max(currentYear, `Year Built cannot be later than ${currentYear}`)
    .required('Year Built is required'),
  rooms: Yup.number().nullable().required('Rooms Required'),
  bathrooms: Yup.number().nullable().required('Bathrooms Required'),
});
interface Props {
  flat?: Flat;
}

const FlatForm = ({ flat }: Props) => {
  const [flatFile, setFlatFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      console.log('TRUE');
      navigate('/');
    } else {
      console.log('else');
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      areaSize: flat?.areaSize || (null as number | null),
      city: flat?.city || '',
      dateAvailable: flat?.dateAvailable
        ? flat.dateAvailable instanceof Timestamp
          ? flat.dateAvailable.toDate()
          : flat.dateAvailable
        : null,
      hasAc: flat?.hasAc || false,
      price: flat?.price || (null as number | null),
      streetName: flat?.streetName || '',
      streetNumber: flat?.streetNumber || (null as number | null),
      yearBuilt: flat?.yearBuilt || (null as number | null),
      flatImage: flat?.flatImage || '',
      rooms: flat?.rooms || (null as number | null),
      bathrooms: flat?.bathrooms || (null as number | null),
    },
    validationSchema: FlatSchema,
    onSubmit: async (values, { resetForm }) => {
      if (!user?.email) {
        // Handle the error appropriately, such as displaying a message to the user
        console.error('User is not logged in or email is not available.');
        return;
      }
      let imageUrl = '';

      try {
        if (flatFile) {
          imageUrl = await uploadFlatImage(flatFile);
        }

        const flat: Omit<Flat, 'id'> = {
          city: values.city,
          areaSize: values.areaSize,
          dateAvailable: values.dateAvailable
            ? values.dateAvailable
            : Timestamp.now(),
          hasAc: values.hasAc,
          price: values.price,
          streetName: values.streetName,
          streetNumber: values.streetNumber,
          yearBuilt: values.yearBuilt,
          rooms: values.rooms,
          bathrooms: values.bathrooms,
          flatUser: user.email || '', // Set the flatUser to the logged-in user's email
          flatImage: imageUrl,
        };

        // Create the flat document and get its ID
        const flatId = await createFlat(flat);

        console.log('Flat Created Successfully with ID:', flatId);
        resetForm();
        setFlatFile(null);
        navigate('/home'); // Redirect to a different page after submission
      } catch (error) {
        console.error('Error creating flat:', error);
      }
    },
  });

  const handleUploadImage = async (e: FileUploadHandlerEvent) => {
    const file = e.files[0];
    setFlatFile(file);
  };

  const handleDateChange = (
    field: string,
    value: Date | Date[] | undefined,
  ) => {
    const date =
      value instanceof Date ? value : Array.isArray(value) ? value[0] : null;
    formik.setFieldValue(field, date);
  };
  return (
    <>
      <form
        id="newFlatForm"
        className="w-full flex flex-column gap-5 "
        onSubmit={formik.handleSubmit}
      >
        {/* Display error message if any */}
        {formik.submitCount > 0 && Object.keys(formik.errors).length > 0 && (
          <Message
            severity="error"
            text="Please correct the errors in the form."
            className="w-full justify-content-start text-pink-300 bg-indigo-800"
            id="error-message"
          />
        )}
        {/* Street Name and Street Number */}
        <div className="flex gap-3 w-full md:flex-row flex-column">
          {/* City */}
          <div>
            <GeneralInput
              id="streetNumber"
              name="streetNumber"
              value={formik.values.streetNumber ?? ''}
              onChange={formik.handleChange}
              iconClass="pi pi-hashtag text-500"
              label="Street Number"
              type="number"
            />
            <FormErrorMessage
              touched={formik.touched.streetNumber}
              error={formik.errors.streetNumber}
            />
          </div>
          {/* Street Name */}
          <div>
            <GeneralInput
              id="streetName"
              name="streetName"
              value={formik.values.streetName}
              onChange={formik.handleChange}
              type="text"
              iconClass="pi pi-user text-500"
              label="Street Name"
            />
            <FormErrorMessage
              touched={formik.touched.streetName}
              error={formik.errors.streetName}
            />
          </div>
        </div>

        {/* Area & City */}
        <div className="flex gap-3 w-full md:flex-row flex-column">
          {/* City */}
          <div>
            <GeneralInput
              id="city"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              iconClass="pi pi-map-marker text-500"
              label="City"
            />
            <FormErrorMessage
              touched={formik.touched.city}
              error={formik.errors.city}
            />
          </div>

          {/* Price */}
          <div>
            <GeneralInput
              id="price"
              name="price"
              value={formik.values.price ?? ''}
              onChange={formik.handleChange}
              type="number"
              iconClass="pi pi-dollar text-500"
              label="Price"
            />
            <FormErrorMessage
              touched={formik.touched.price}
              error={formik.errors.price}
            />
          </div>
        </div>

        {/* Rooms & Bathrooms */}
        <div className="flex gap-3 w-full md:flex-row flex-column">
          {/* Rooms */}
          <div>
            <GeneralInput
              id="rooms"
              name="rooms"
              value={formik.values.rooms ?? ''}
              onChange={formik.handleChange}
              iconClass="pi pi-building text-500"
              label="Rooms"
            />
            <FormErrorMessage
              touched={formik.touched.rooms}
              error={formik.errors.rooms}
            />
          </div>

          {/* Bathrooms */}
          <div>
            <GeneralInput
              id="bathrooms"
              name="bathrooms"
              value={formik.values.bathrooms ?? ''}
              onChange={formik.handleChange}
              type="number"
              iconClass="pi pi-building text-500"
              label="Bathrooms"
            />
            <FormErrorMessage
              touched={formik.touched.bathrooms}
              error={formik.errors.bathrooms}
            />
          </div>
        </div>

        {/* Year & Date Available */}
        <div className="flex gap-3 w-full md:flex-row flex-column">
          {/* Year */}
          <div>
            <FloatLabel>
              <IconField iconPosition="left">
                <InputIcon className="pi pi-calendar text-500"> </InputIcon>
                <Calendar
                  id="yearBuilt"
                  value={
                    formik.values.yearBuilt !== null
                      ? new Date(formik.values.yearBuilt, 0, 1)
                      : null
                  } // Convert year to Date
                  onChange={(e) => {
                    const selectedDate = e.value as Date;
                    if (selectedDate) {
                      formik.setFieldValue(
                        'yearBuilt',
                        selectedDate.getFullYear(),
                      );
                    }
                  }}
                  view="year"
                  dateFormat="yy"
                  minDate={minYearDate} // Limit to years after 1900
                  maxDate={maxYearDate} // Limit to the current year
                  yearNavigator // Enables a dropdown for selecting the year
                />
              </IconField>
              <label htmlFor="yearBuilt" className="left-3 text-400">
                Year Built
              </label>
            </FloatLabel>
            <FormErrorMessage
              touched={formik.touched.yearBuilt}
              error={formik.errors.yearBuilt}
            />
          </div>

          {/* Date Available */}
          <div>
            <FloatLabel>
              <IconField iconPosition="left">
                <InputIcon className="pi pi-calendar text-500"> </InputIcon>
                <Calendar
                  id="dateAvailable"
                  value={formik.values.dateAvailable}
                  onChange={(e) =>
                    handleDateChange(
                      'dateAvailable',
                      e.value as Date | undefined,
                    )
                  }
                  minDate={minDate}
                  maxDate={maxDate}
                  dateFormat="dd/mm/yy"
                />
              </IconField>
              <label htmlFor="dateAvailable" className="left-3 text-400">
                Date Available
              </label>
            </FloatLabel>
            <FormErrorMessage
              touched={formik.touched.dateAvailable}
              error={formik.errors.dateAvailable}
            />
          </div>
        </div>

        {/* Area Size & Has AC */}
        <div className="flex gap-3 w-full md:flex-row flex-column">
          {/* Area Size */}
          <div className="w-full">
            <GeneralInput
              id="areaSize"
              name="areaSize"
              value={formik.values.areaSize ?? ''}
              onChange={formik.handleChange}
              type="number"
              iconClass="pi pi-expand text-500"
              label="Area Size"
            />
            <FormErrorMessage
              touched={formik.touched.areaSize}
              error={formik.errors.areaSize}
            />
          </div>

          {/* Has AC */}
          <div className="w-full justify-content-start align-items-center gap-3 flex ">
            <InputSwitch
              checked={formik.values.hasAc}
              onChange={(e: InputSwitchChangeEvent) =>
                formik.setFieldValue('hasAc', e.value)
              }
              id="hasAC"
            />
            <label htmlFor="hasAC">Has AC</label>
          </div>
          <FormErrorMessage
            touched={formik.touched.hasAc}
            error={formik.errors.hasAc}
          />
        </div>

        <FileUpload
          name="demo[]"
          multiple={false}
          accept="image/*"
          maxFileSize={1000000}
          emptyTemplate={
            <p className="m-0">Drag and drop images to here to upload.</p>
          }
          chooseLabel="Photo"
          customUpload
          auto
          uploadHandler={handleUploadImage}
        />

        {/* Button */}
        <Button
          label="Create Flat"
          type="submit"
          className="w-full bg-indigo-500 text-white"
        />
      </form>
    </>
  );
};
export default FlatForm;
