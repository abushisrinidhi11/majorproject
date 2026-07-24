import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";
const CategoryContext = createContext<any>(null);
const CategoryProvider = ({ children }: any) =>
{
    console.log("Category Provider Rendering");
    const auth = useAuth();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const getCategories = async () =>
    {
        console.log("Get Categories Started");
        try
        {
            const response = await api.get("/categories");
            console.log("Categories Loaded Successfully");
            setCategories(response.data.categories);
        }
        catch (error: any)
        {
            console.log("Get Categories Failed");
            console.log(error.response?.data || error.message);
        }
        finally
        {
            setLoading(false);
        }
    };
    useEffect(() =>
    {
        console.log("Loading Categories");
        if (auth.loading)
        {
            return;
        }
        if (!auth.user)
        {
            setCategories([]);
            setLoading(false);
            return;
        }
        getCategories();
    }, [auth.loading, auth.user]);
    const createCategory = async (values: any) =>
    {
        console.log("Create Category Started");
        try
        {
            await api.post("/categories", values);
            console.log("Category Created");
            await getCategories();
        }
        catch (error: any)
        {
            console.log("Create Category Failed");
            console.log(error.response?.data || error.message);
            throw error;
        }
    };
    const updateCategory = async (id: string, values: any) =>
    {
        console.log("Update Category Started");
        try
        {
            await api.put(`/categories/${id}`, values);
            console.log("Category Updated");
            await getCategories();
        }
        catch (error: any)
        {
            console.log("Update Category Failed");
            console.log(error.response?.data || error.message);
            throw error;
        }
    };
    const deleteCategory = async (id: string) =>
    {
        console.log("Delete Category Started");
        try
        {
            await api.delete(`/categories/${id}`);
            console.log("Category Deleted");
            await getCategories();
        }
        catch (error: any)
        {
            console.log(error.response?.data || error.message);
            throw error;
        }
    };
    return (
        <CategoryContext.Provider
            value={{
                categories,
                loading,
                getCategories,
                createCategory,
                updateCategory,
                deleteCategory
            }}>
            {children}
        </CategoryContext.Provider>
    );
};
const useCategory = () =>
{
    return useContext(CategoryContext);
};
export { CategoryProvider, useCategory };