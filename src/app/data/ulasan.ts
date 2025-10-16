"use client";
import {useEffect, useState} from "react";
export type ulasan = {
  id: number;
  name: string;
  avatar: string;
  text: string;
  rating: number;
  date: string;
  city: string;
};

export type Review = {
  id: number;
  name: string;
  avatar: string;
  text: string;
  rating: number;
  date: string;
  city: string;
};

export default async function getReviews(): Promise<Review[]> 
{
  const response = await fetch("http://127.0.0.1:8000/api/ulasan/");
  const data = await response.json();
  return data.data;
}
