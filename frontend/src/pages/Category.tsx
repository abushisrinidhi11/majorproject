import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { useCategory } from "../context/CategoryContext";
import { useAuth } from "../context/AuthContext";
import { categoryValidation } from "../validations/category.validation";
import RecruiterLayout from "../layouts/RecruiterLayout";
import "../styles/category.css";

function Category()
{
    console.log("Category Page Rendering");

    const category = useCategory();

    const { user } = useAuth();

    const [editIndex, setEditIndex] = useState(-1);

    const [selectedCategory, setSelectedCategory] = useState({
        name: "",
        description: ""
    });

    if (category.loading)
    {
        return (
            <RecruiterLayout>

                <div className="loadingContainer">

                    <h2>Loading Categories...</h2>

                </div>

            </RecruiterLayout>
        );
    }

    const handleSubmit = async (
        values: any,
        { resetForm }: any
    ) =>
    {
        console.log("Category Form Submitted");

        try
        {
            if (editIndex === -1)
            {
                console.log("Creating Category");

                await category.createCategory(values);

                console.log("Category Created Successfully");
            }
            else
            {
                console.log("Updating Category");

                const currentCategory =
                    category.categories[editIndex];

                await category.updateCategory(
                    currentCategory._id,
                    values
                );

                console.log("Category Updated Successfully");
            }

            resetForm();

            setSelectedCategory({
                name: "",
                description: ""
            });

            setEditIndex(-1);

            console.log("Form Reset Successfully");
        }
        catch (error)
        {
            console.log("Category Save Failed");

            console.log(error);
        }
    };

    const handleEdit = (index: number) =>
    {
        console.log("Edit Button Clicked");

        setEditIndex(index);

        setSelectedCategory({
            name: category.categories[index].name,
            description: category.categories[index].description
        });
    };

    const handleDelete = async (index: number) =>
    {
        console.log("Delete Button Clicked");

        try
        {
            const currentCategory =
                category.categories[index];

            await category.deleteCategory(
                currentCategory._id
            );

            console.log("Category Deleted Successfully");
        }
        catch (error)
        {
            console.log(error);
        }
    };

    const handleCancel = () =>
    {
        console.log("Cancel Edit");

        setEditIndex(-1);

        setSelectedCategory({
            name: "",
            description: ""
        });
    };

    return (

        <RecruiterLayout>

            <div className="categoryPage">

                <div className="categoryHeader">

                    <h1>Category Management</h1>

                    <p>

                        Total Categories :

                        <span>

                            {" "}

                            {category.categories.length}

                        </span>

                    </p>

                </div>

                <div className="categoryFormCard">

                    <Formik
                        initialValues={selectedCategory}
                        validationSchema={categoryValidation}
                        onSubmit={handleSubmit}
                        enableReinitialize
                    >

                        <Form>

                            <div className="formGroup">

                                <label>

                                    Category Name

                                </label>

                                <Field
                                    type="text"
                                    name="name"
                                />

                                <ErrorMessage
                                    name="name"
                                    component="p"
                                    className="error"
                                />

                            </div>

                            <div className="formGroup">

                                <label>

                                    Description

                                </label>

                                <Field
                                    type="text"
                                    name="description"
                                />

                                <ErrorMessage
                                    name="description"
                                    component="p"
                                    className="error"
                                />

                            </div>

                            <div className="buttonGroup">

                                <button
                                    className="saveButton"
                                    type="submit"
                                >

                                    {
                                        editIndex === -1
                                            ? "Create Category"
                                            : "Update Category"
                                    }

                                </button>

                                {
                                    editIndex !== -1 &&

                                    <button
                                        className="cancelButton"
                                        type="button"
                                        onClick={handleCancel}
                                    >

                                        Cancel

                                    </button>

                                }

                            </div>

                        </Form>

                    </Formik>

                </div>

                <div className="tableCard">

                    <table className="categoryTable">

                        <thead>

                            <tr>

                                <th>Name</th>

                                <th>Description</th>

                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                category.categories.length === 0 ?

                                    (

                                        <tr>

                                            <td
                                                colSpan={3}
                                                className="emptyRow"
                                            >

                                                No Categories Found

                                            </td>

                                        </tr>

                                    )

                                    :

                                    category.categories.map(
                                        (item: any, index: number) => (

                                            <tr key={item._id}>

                                                <td>

                                                    {item.name}

                                                </td>

                                                <td>

                                                    {item.description}

                                                </td>

                                                <td>

                                                    {
                                                        item.createdBy === user?._id
                                                            ?
                                                            (
                                                                <>
                                                                    <button
                                                                        className="editButton"
                                                                        onClick={() =>
                                                                            handleEdit(index)
                                                                        }
                                                                    >

                                                                        Edit

                                                                    </button>

                                                                    <button
                                                                        className="deleteButton"
                                                                        onClick={() =>
                                                                            handleDelete(index)
                                                                        }
                                                                    >

                                                                        Delete

                                                                    </button>
                                                                </>
                                                            )
                                                            :
                                                            (
                                                                <span className="readOnlyLabel">
                                                                    Created by another recruiter
                                                                </span>
                                                            )
                                                    }

                                                </td>

                                            </tr>

                                        )
                                    )

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </RecruiterLayout>

    );
}

export default Category;