import axios, { AxiosResponse } from 'axios';
import { Course, Department } from './types.js'; // Adjust the import path as needed


const API_BASE_URL = 'http://localhost:3001'; // Adjust as necessary

export const listDepartments = (): Promise<AxiosResponse<Department[]>> => axios.get(`${API_BASE_URL}/departments`);

export const createDepartment = (data: Department): Promise<AxiosResponse<Department>> => axios.post(`${API_BASE_URL}/departments`, data);

export const getDepartment = (slug: string): Promise<AxiosResponse<Department>> => axios.get(`${API_BASE_URL}/departments/${slug}`);

export const updateDepartment = (slug: string, data: Department): Promise<AxiosResponse<Department>> => axios.patch(`${API_BASE_URL}/departments/${slug}`, data);

export const deleteDepartment = (slug: string): Promise<AxiosResponse<{}>> => axios.delete(`${API_BASE_URL}/departments/${slug}`);

export const listCourses = (slug: string): Promise<AxiosResponse<Course[]>> => 
  axios.get(`${API_BASE_URL}/departments/${slug}/courses`);

export const createCourse = (slug: string, data: Course): Promise<AxiosResponse<Course>> => 
  axios.post(`${API_BASE_URL}/departments/${slug}/courses`, data);

export const getCourse = (slug: string, courseId: string): Promise<AxiosResponse<Course>> => 
  axios.get(`${API_BASE_URL}/departments/${slug}/courses/${courseId}`);

export const updateCourse = (slug: string, courseId: string, data: Course): Promise<AxiosResponse<Course>> => 
  axios.patch(`${API_BASE_URL}/departments/${slug}/courses/${courseId}`, data);

export const deleteCourse = (slug: string, courseId: string): Promise<AxiosResponse<{}>> => 
  axios.delete(`${API_BASE_URL}/departments/${slug}/courses/${courseId}`);