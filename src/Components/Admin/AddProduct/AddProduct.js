import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ref, getStorage, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import axios from 'axios';

// Material UI
import ImageIcon from '@mui/icons-material/Image';

// Local Imports
import './AddProduct.css';
import useAuth from '../../../Hooks/useAuth';
import { LinearProgress } from '@mui/material';
import initializeFirebase from '../../../Firebase/firebase';

initializeFirebase();

const AddProduct = () => {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);

    const imgRef = useRef();

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { setError, setSuccess } = useAuth();

    // Functions
    const handleImgChange = e => {
        const file = e.target.files[0];
        if (file && file.type.substr(0, 5) === 'image') {
            setImage(file);
        }
        else setImage(null)
    }

    const addNewCar = (data, img) => {
        const car = {
            ...data,
            image: img
        }

        axios.post(`${process.env.REACT_APP_SERVER_URL}/cars`, car)
            .then(response => {
                if (response.data.insertedId) {
                    setSuccess('Successfully Added New Car');
                    reset();
                    setImage(null);
                }
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }

    const uploadImage = (data) => {
        const date = new Date();

        if (image !== null) {
            const storage = getStorage();
            const storageRef = ref(storage, `Cars/${image.name.split('.')[0]}_${date.getTime()}`);
            const metaData = {
                contentType: 'image/png'
            }
            const uploadTask = uploadBytesResumable(storageRef, image, metaData)

            uploadTask.on('state_changed', snapshot => { },
                err => { setError(err.message); setLoading(false) },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then(url => addNewCar(data, url))
                        .catch(err => {
                            setLoading(false);
                            setError(err.message);
                        })
                }
            )
        }
    }

    const onsubmit = data => {
        setLoading(true);

        if (!image) {
            setError('Add an image related to ride');
            setLoading(false);
            return;
        }
        uploadImage(data);
    }

    return (
        <div>
            <h2>Add Car</h2>

            <div className="form-container">
                <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    ref={imgRef}
                    onChange={handleImgChange}
                />
                <form onSubmit={handleSubmit(onsubmit)} className="form-container__form new-car">
                    {loading && <LinearProgress color='success' sx={{ mb: 2 }} />}
                    {
                        image && <div className="car-img">
                            <img src={URL.createObjectURL(image)} alt="car" />
                        </div>
                    }

                    <div onClick={() => imgRef.current.click()} className="img-input">
                        <span className="add-img-icon"><ImageIcon /></span> &nbsp; {image ? 'Change Photo' : 'Add Photo'}
                    </div>

                    <input
                        placeholder="Title"
                        style={{ borderColor: `${errors.title ? 'red' : ''}` }}
                        {...register(
                            'title',
                            { required: "Title is required" }
                        )}
                    />
                    <p className="form-container__form__error">{errors.title?.message}&nbsp;</p>

                    <textarea
                        placeholder="Features"
                        style={{ borderColor: `${errors.features ? 'red' : ''}` }}
                        {...register(
                            'features',
                            { required: "Features is required" }
                        )}
                    >
                    </textarea>
                    <p className="form-container__form__error">{errors.features?.message}&nbsp;</p>

                    <input
                        placeholder="Price"
                        style={{ borderColor: `${errors.phone ? 'red' : ''}` }}
                        {...register(
                            'price',
                            {
                                required: "Price is required",
                                pattern: { value: /^\d+$/, message: 'Invalid Price' }
                            }
                        )}
                    />
                    <p className="form-container__form__error">{errors.price?.message}&nbsp;</p>

                    <button type="submit"> Add Car </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;