import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, Cascader, message, Table } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

export default function ProductCategories() {
  const [form] = Form.useForm();
  const [partNumber, setPartNumber] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [note, setNote] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [machineDataSource, setMachineDataSource] = useState([]);
  const [assetsDataSource, setAssetsDataSource] = useState([]);
  const [auxiliariesDataSource, setAuxiliariesDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [inputRow, setInputRow] = useState({
    partNumber: "",
    description: "",
    quantity: "",
    stockInHand: "",
    note: "",
  });
  const [machineinputRow, setMachineInputRow] = useState({
    partNumber: "",
    description: "",
    quantity: "",
    stockInHand: "",
    note: "",
  });
  const [selectedAssets, setSelectedAssets] = useState(null);
  const [selectedAuxiliaries, setSelectedAuxiliaries] = useState(null);

  const [auxiliariesInputRow, setAuxiliariesInputRow] = useState({
    partNumber: "",
    description: "",
    quantity: "",
    stockInHand: "",
    note: "",
  });

  const [assetsInputRow, setAssetsInputRow] = useState({
    partNumber: "",
    description: "",
    quantity: "",
    stockInHand: "",
    note: "",
  });
  const [selectedMachine, setSelectedMachine] = useState(null);

  const [selectedIMMSeries, setSelectedIMMSeries] = useState(null);
   const GAS_URL =
      "https://script.google.com/macros/s/AKfycbzr-I0ng6HnlHmSz46FY88fclR5SYtzhOhBR0nlYKBLT_K3oYcmfzKgFRuii6asv2NKaw/exec";

  const IMMSeriesOptions = [
    { value: "MA", label: "MA (Mars)" },
    { value: "JU", label: "JU (Jupiter)" },
    { value: "JE", label: "JE (Jenius)" },
    { value: "VE", label: "VE (Venus)" },
    { value: "ZE", label: "ZE (Zerus)" },
    { value: "HA", label: "HA" },
  ];

  const MAOptions = [
    "MA V",
    "MA V/h",
    "MA F",
    "MA III/SE",
    "MA H Pro",
    "MA Multi",
    "MA GIII",
  ];
  const JUOptions = ["JU V", "JU SE", "JU Multi", "JU V/h"];
  const HAOptions = [
    "HA PET",
    "HA Auriga",
    "HA Pegasus",
    "HA ARA",
    "HA TSP",
    "HA PVC",
  ];
  const JEOptions = ["JE V"];
  const VEOptions = ["VE V", "VE V/h", "VE V/hs"];
  const ZEOptions = ["ZE V", "ZE V/h", "ZE V/hs", "ZE F"];

  const auxiliariesOptions = [
    {
      value: "Chiller",
      label: "Chiller",
      children: [
        {
          value: "Air-Cooled",
          label: "Air-Cooled",
          children: [
            { value: "HTC-03A/W", label: "HTC-03A/W" },
            { value: "HTC-05A/W", label: "HTC-05A/W" },
            { value: "HTC-08A/W", label: "HTC-08A/W" },
            { value: "HTC-10A/W", label: "HTC-10A/W" },
            { value: "HTC-12SA/W", label: "HTC-12SA/W" },
            { value: "HTC-15SA/W", label: "HTC-15SA/W" },
            { value: "HTC-20SA-D/W", label: "HTC-20SA-D/W" },
            { value: "HTC-25SA-D/W", label: "HTC-25SA-D/W" },
            { value: "HTC-30SA-D/W", label: "HTC-30SA-D/W" },
            { value: "HTC-40SA-D/W", label: "HTC-40SA-D/W" },
            { value: "HTC-50SA-D/W", label: "HTC-50SA-D/W" },
          ],
        },
        {
          value: "Water-Cooled",
          label: "Water-Cooled",
          children: [
            { value: "HTC-03W/W", label: "HTC-03W/W" },
            { value: "HTC-05W/W", label: "HTC-05W/W" },
            { value: "HTC-08W/W", label: "HTC-08W/W" },
            { value: "HTC-10W/W", label: "HTC-10W/W" },
            { value: "HTC-12SW/W", label: "HTC-12SW/W" },
            { value: "HTC-15SW/W", label: "HTC-15SW/W" },
            { value: "HTC-20SW-D/W", label: "HTC-20SW-D/W" },
            { value: "HTC-25SW-D/W", label: "HTC-25SW-D/W" },
            { value: "HTC-30SW-D/W", label: "HTC-30SW-D/W" },
            { value: "HTC-40SW-D/W", label: "HTC-40SW-D/W" },
            { value: "HTC-50SW-D/W", label: "HTC-50SW-D/W" },
          ],
        },
      ],
    },
    {
      value: "Autoloader",
      label: "Autoloader",
      children: [
        { value: "HTAL-300GN HUL/W", label: "HTAL-300GN HUL/W" },
        { value: "HTAL-1.5P HUL/W", label: "HTAL-1.5P HUL/W" },
        { value: "HTAL-2.5P HUL/W", label: "HTAL-2.5P HUL/W" },
        { value: "HTAL-5P-UL/W", label: "HTAL-5P-UL/W" },
        { value: "HTAL-10P-UL/W", label: "HTAL-10P-UL/W" },
        { value: "HTAL-1.5P-D HUL/W", label: "HTAL-1.5P-D HUL/W" },
        { value: "HTAL-2.5P-D HUL/W", label: "HTAL-2.5P-D HUL/W" },
      ],
    },
    {
      value: "Hopper & Dryer",
      label: "Hopper & Dryer",
      children: [
        { value: "HTHD-25MHL/EAF/W", label: "HTHD-25MHL/EAF/W" },
        { value: "HTHD-50MHL/EAF/W", label: "HTHD-50MHL/EAF/W" },
        { value: "HTHD-75MHL/EAF/W", label: "HTHD-75MHL/EAF/W" },
        { value: "HTHD-100MHL/EAF/W", label: "HTHD-100MHL/EAF/W" },
        { value: "HTHD-150MHL/EAF/W", label: "HTHD-150MHL/EAF/W" },
        { value: "HTHD-200MHL/EAF/W", label: "HTHD-200MHL/EAF/W" },
        { value: "HTHD-300MHL/EAF/W", label: "HTHD-300MHL/EAF/W" },
        { value: "HTHD-400MHL/EAF/W", label: "HTHD-400MHL/EAF/W" },
        { value: "HTHD-600MHL/EAF/W", label: "HTHD-600MHL/EAF/W" },
      ],
    },
    {
      value: "Crusher",
      label: "Crusher",
      children: [
        { value: "HTGS260/W", label: "HTGS260/W" },
        { value: "HTGS320/W", label: "HTGS320/W" },
        { value: "HTGS420/W", label: "HTGS420/W" },
        { value: "HTGS480/W", label: "HTGS480/W" },
        { value: "HTGM230-270/W", label: "HTGM230-270/W" },
        { value: "HTGM270-290/W", label: "HTGM270-290/W" },
        { value: "HTGM370-310/W", label: "HTGM370-310/W" },
        { value: "HTGM270-430/W", label: "HTGM270-430/W" },
        { value: "HTSS230/W", label: "HTSS230/W" },
        { value: "HTSS300/W", label: "HTSS300/W" },
        { value: "HTSS400/W", label: "HTSS400/W" },
        { value: "HTSS500/W", label: "HTSS500/W" },
        { value: "HTSS600/W", label: "HTSS600/W" },
        { value: "HTSS800/W", label: "HTSS800/W" },
      ],
    },
    {
      value: "Color Mixer",
      label: "Color Mixer",
      children: [
        { value: "HTHS-50/W", label: "HTHS-50/W" },
        { value: "HTHS-100/W", label: "HTHS-100/W" },
        { value: "HTHS-150/W", label: "HTHS-150/W" },
        { value: "HTHS-200/W", label: "HTHS-200/W" },
      ],
    },
    { value: "Robots", label: "Robots" },
    { value: "Conveyor", label: "Conveyor" },
    {
      value: "Auto loader",
      label: "Auto loader",
      children: [
        { value: "HTAL-300GN HUL/W", label: "HTAL-300GN HUL/W" },
        { value: "HTAL-1.5P HUL/W", label: "HTAL-1.5P HUL/W" },
        { value: "HTAL-2.5P HUL/W", label: "HTAL-2.5P HUL/W" },
        { value: "HTAL-5P-UL/W", label: "HTAL-5P-UL/W" },
        { value: "HTAL-10P-UL/W", label: "HTAL-10P-UL/W" },
        { value: "HTAL-1.5P-D HUL/W", label: "HTAL-1.5P-D HUL/W" },
        { value: "HTAL-2.5P-D HUL/W", label: "HTAL-2.5P-D HUL/W" },
      ],
    },
    {
      value: "Hydraulic Clamp",
      label: "Hydraulic Clamp",
      children: [
        { value: "HW2/25-8", label: "HW2/25-8" },
        { value: "HW4/40-8", label: "HW4/40-8" },
        { value: "HW6/30-8", label: "HW6/30-8" },
        { value: "HW10/40-8", label: "HW10/40-8" },
        { value: "HW16/50-8", label: "HW16/50-8" },
        { value: "HW16/50-12", label: "HW16/50-12" },
        { value: "HW25/50-12", label: "HW25/50-12" },
        { value: "HW25/50-16", label: "HW25/50-16" },
        { value: "HW10/S150/40-8", label: "HW10/S150/40-8" },
        { value: "HW16/S200/50-8", label: "HW16/S200/50-8" },
        { value: "HW16/S250/50-12", label: "HW16/S250/50-12" },
        { value: "HW25/S250/50-12", label: "HW25/S250/50-12" },
        { value: "HW25/S300/50-16", label: "HW25/S300/50-16" },
        { value: "HW25/S350/50-16", label: "HW25/S350/50-16" },
        { value: "HW50/S350/60-16", label: "HW50/S350/60-16" },
      ],
    },
    {
      value: "All in one Dryer",
      label: "All in one Dryer",
      children: [
        { value: "HTDL-30F/W", label: "HTDL-30F/W" },
        { value: "HTDL-50F/W", label: "HTDL-50F/W" },
        { value: "HTDL-75F/W", label: "HTDL-75F/W" },
        { value: "HTDL-100F/W", label: "HTDL-100F/W" },
        { value: "HTDL-150F/W", label: "HTDL-150F/W" },
        { value: "HTDL-200F/W", label: "HTDL-200F/W" },
        { value: "HTDL-300F/W", label: "HTDL-300F/W" },
        { value: "HTDL-400F/W", label: "HTDL-400F/W" },
        { value: "HTDL-600F/W", label: "HTDL-600F/W" },
        { value: "HTDL-800F/W", label: "HTDL-800F/W" },
        { value: "HTDL-1000F/W", label: "HTDL-1000F/W" },
        { value: "HTDL-30N/W", label: "HTDL-30N/W" },
        { value: "HTDL-50N/W", label: "HTDL-50N/W" },
        { value: "HTDL-75N/W", label: "HTDL-75N/W" },
        { value: "HHTDL-100N/W", label: "HHTDL-100N/W" },
        { value: "HTDL-150N/W", label: "HTDL-150N/W" },
        { value: "HTDL-200N/W", label: "HTDL-200N/W" },
        { value: "HTDL-300N/W", label: "HTDL-300N/W" },
        { value: "HTDL-400N/W", label: "HTDL-400N/W" },
        { value: "HTDL-600N/W", label: "HTDL-600N/W" },
        { value: "HTDL-800N/W", label: "HTDL-800N/W" },
      ],
    },
    {
      value: "Coloer dozer Volumetric",
      label: "Coloer dozer Volumetric",
      children: [
        { value: "HTCM-A5/W", label: "HTCM-A5/W" },
        { value: "HTCM-A10/W", label: "HTCM-A10/W" },
        { value: "HTCM-A15/W", label: "HTCM-A15/W" },
        { value: "HTCM-A20/W", label: "HTCM-A20/W" },
        { value: "HTCM-A30/W", label: "HTCM-A30/W" },
      ],
    },
    {
      value: "Gravemetric Blender",
      label: "Gravemetric Blender",
      children: [
        { value: "HTGB-1-2/W", label: "HTGB-1-2/W" },
        { value: "HTGB-1-3/W", label: "HTGB-1-3/W" },
        { value: "HTGB-1-4/W", label: "HTGB-1-4/W" },
        { value: "HTGB-2-2/W", label: "HTGB-2-2/W" },
        { value: "HTGB-2-3/W", label: "HTGB-2-3/W" },
        { value: "HTGB-2-4/W", label: "HTGB-2-4/W" },
        { value: "HTGB-2-5/W", label: "HTGB-2-5/W" },
        { value: "HTGB-2-6/W", label: "HTGB-2-6/W" },
        { value: "HTGB-5-2/W", label: "HTGB-5-2/W" },
        { value: "HTGB-5-3/W", label: "HTGB-5-3/W" },
        { value: "HTGB-5-4/W", label: "HTGB-5-4/W" },
        { value: "HTGB-5-5/W", label: "HTGB-5-5/W" },
        { value: "HTGB-5-6/W", label: "HTGB-5-6/W" },
        { value: "HTGB-10-2/W", label: "HTGB-10-2/W" },
        { value: "HTGB-10-3/W", label: "HTGB-10-3/W" },
        { value: "HTGB-10-4/W", label: "HTGB-10-4/W" },
        { value: "HTGB-10-5/W", label: "HTGB-10-5/W" },
        { value: "HTGB-10-6/W", label: "HTGB-10-6/W" },
      ],
    },
    {
      value: "Mold temp controller",
      label: "Mold temp controller",
      children: [
        { value: "HTMC-6H/W", label: "HTMC-6H/W" },
        { value: "HTMC-9H/W", label: "HTMC-9H/W" },
        { value: "HTMC-12H/W", label: "HTMC-12H/W" },
        { value: "HTMC-18H/W", label: "HTMC-18H/W" },
        { value: "HTMC-24H/W", label: "HTMC-24H/W" },
        { value: "HTMC-6H-D/W", label: "HTMC-6H-D/W" },
        { value: "HTMC-9H-D/W", label: "HTMC-9H-D/W" },
        { value: "HTMC-12H-D/W", label: "HTMC-12H-D/W" },
        { value: "HTMC-18H-D/W", label: "HTMC-18H-D/W" },
        { value: "HTMC-24H-D/W", label: "HTMC-24H-D/W" },
        { value: "HTMC-6WG/W", label: "HTMC-6WG/W" },
        { value: "HTMC-9WG/W", label: "HTMC-9WG/W" },
        { value: "HTMC-12WG/W", label: "HTMC-12WG/W" },
        { value: "HTMC-18WG/W", label: "HTMC-18WG/W" },
        { value: "HTMC-24WG/W", label: "HTMC-24WG/W" },
        { value: "HTMC-6WG-D/W", label: "HTMC-6WG-D/W" },
        { value: "HTMC-9WG-D/W", label: "HTMC-9WG-D/W" },
        { value: "HTMC-12WG-D/W", label: "HTMC-12WG-D/W" },
        { value: "HTMC-18WG-D/W", label: "HTMC-18WG-D/W" },
        { value: "HTMC-24WG-D/W", label: "HTMC-24WG-D/W" },
        { value: "HTMC-9WP/W", label: "HTMC-9WP/W" },
        { value: "HTMC-12WP/W", label: "HTMC-12WP/W" },
        { value: "HTMC-18WP/W", label: "HTMC-18WP/W" },
        { value: "HTMC-24WP/W", label: "HTMC-24WP/W" },
        { value: "HTMC-9HT/W", label: "HTMC-9HT/W" },
        { value: "HTMC-12HT/W", label: "HTMC-12HT/W" },
        { value: "HTMC-6EH/W", label: "HTMC-6EH/W" },
        { value: "HTMC-9EH/W", label: "HTMC-9EH/W" },
        { value: "HTMC-12EH/W", label: "HTMC-12EH/W" },
        { value: "HTMC-18EH/W", label: "HTMC-18EH/W" },
        { value: "HTMC-24EH/W", label: "HTMC-24EH/W" },
        { value: "HTMC-6EH-D/W", label: "HTMC-6EH-D/W" },
        { value: "HTMC-9EH-D/W", label: "HTMC-9EH-D/W" },
        { value: "HTMC-12EH-D/W", label: "HTMC-12EH-D/W" },
        { value: "HTMC-18EH-D/W", label: "HTMC-18EH-D/W" },
        { value: "HTMC-24EH-D/W", label: "HTMC-24EH-D/W" },
        { value: "HTMC-9EHT/W", label: "HTMC-9EHT/W" },
        { value: "HTMC-12EHT/W", label: "HTMC-12EHT/W" },
        { value: "HTMC-6EWG/W", label: "HTMC-6EWG/W" },
        { value: "HTMC-9EWG/W", label: "HTMC-9EWG/W" },
        { value: "HTMC-12EWG/W", label: "HTMC-12EWG/W" },
        { value: "HTMC-18EWG/W", label: "HTMC-18EWG/W" },
        { value: "HTMC-24EWG/W", label: "HTMC-24EWG/W" },
        { value: "HTMC-6EWG-D/W", label: "HTMC-6EWG-D/W" },
        { value: "HTMC-9EWG-D/W", label: "HTMC-9EWG-D/W" },
        { value: "HTMC-12EWG-D/W", label: "HTMC-12EWG-D/W" },
        { value: "HTMC-18EWG-D/W", label: "HTMC-18EWG-D/W" },
        { value: "HTMC-24EWG-D/W", label: "HTMC-24EWG-D/W" },
        { value: "HTMC-9EWP/W", label: "HTMC-9EWP/W" },
        { value: "HTMC-12EWP/W", label: "HTMC-12EWP/W" },
        { value: "HTMC-9AWG-C/W", label: "HTMC-9AWG-C/W" },
        { value: "HTMC-12AWG-C/W", label: "HTMC-12AWG-C/W" },
        { value: "HTMC-24AWG-C/W", label: "HTMC-24AWG-C/W" },
        { value: "HTMC-9AWM-C/W", label: "HTMC-9AWM-C/W" },
        { value: "HTMC-12AWM-C/W", label: "HTMC-12AWM-C/W" },
        { value: "HTMC-24AWM-C/W", label: "HTMC-24AWM-C/W" },
        { value: "HTMC-9AWG-U/W", label: "HTMC-9AWG-U/W" },
        { value: "HTMC-12AWG-U/W", label: "HTMC-12AWG-U/W" },
        { value: "HTMC-24AWG-U/W", label: "HTMC-24AWG-U/W" },
        { value: "HTMC-36AWG-U/W", label: "HTMC-36AWG-U/W" },
        { value: "HTMC-48AWG-U/W", label: "HTMC-48AWG-U/W" },
        { value: "HTMC-9AWM-U/W", label: "HTMC-9AWM-U/W" },
        { value: "HTMC-12AWM-U/W", label: "HTMC-12AWM-U/W" },
        { value: "HTMC-24AWM-U/W", label: "HTMC-24AWM-U/W" },
        { value: "HTMC-36AWM-U/W", label: "HTMC-36AWM-U/W" },
        { value: "HTMC-48AWM-U/W", label: "HTMC-48AWM-U/W" },
      ],
    },
    {
      value: "Mold monitor",
      label: "Mold monitor",
      children: [
        { value: "HDC-B500-1/W", label: "HDC-B500-1/W" },
        { value: "HDC-B500-2/W", label: "HDC-B500-2/W" },
        { value: "HDC-B500-3/W", label: "HDC-B500-3/W" },
        { value: "HDC-B500-4/W", label: "HDC-B500-4/W" },
      ],
    },
  ];

  useEffect(() => {
  const fetchStockInHand = async () => {
    if (!machineinputRow.partNumber.trim()) return;

    try {
      const res = await fetch(GAS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          action: "getStockForPartNumber",
          partNumber: machineinputRow.partNumber.trim(),
        }),
      });

      const result = await res.json();
      console.log("✅ Stock fetch response:", result);

      if (result.success) {
        setMachineInputRow(prev => ({
          ...prev,
          stockInHand: result.stockInHand.toString(),
        }));
      } else {
        setMachineInputRow(prev => ({
          ...prev,
          stockInHand: "0",
        }));
      }
    } catch (err) {
      console.error("Error fetching stock:", err);
    }
  };

  fetchStockInHand();
}, [machineinputRow.partNumber]);


useEffect(() => {
  const fetchStockInHand = async () => {
    if (!auxiliariesInputRow.partNumber.trim()) return;

    try {
      const res = await fetch(GAS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          action: "getStockForPartNumber",
          partNumber: auxiliariesInputRow.partNumber.trim(),
        }),
      });

      const result = await res.json();
      if (result.success) {
        setAuxiliariesInputRow(prev => ({
          ...prev,
          stockInHand: result.stockInHand.toString(),
        }));
      } else {
        setAuxiliariesInputRow(prev => ({
          ...prev,
          stockInHand: "0",
        }));
      }
    } catch (err) {
      console.error("Error fetching stock (Auxiliaries):", err);
    }
  };

  fetchStockInHand();
}, [auxiliariesInputRow.partNumber]);


useEffect(() => {
  const fetchStockInHand = async () => {
    if (!assetsInputRow.partNumber.trim()) return;

    try {
      const res = await fetch(GAS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          action: "getStockForPartNumber",
          partNumber: assetsInputRow.partNumber.trim(),
        }),
      });

      const result = await res.json();
      if (result.success) {
        setAssetsInputRow(prev => ({
          ...prev,
          stockInHand: result.stockInHand.toString(),
        }));
      } else {
        setAssetsInputRow(prev => ({
          ...prev,
          stockInHand: "0",
        }));
      }
    } catch (err) {
      console.error("Error fetching stock (Assets):", err);
    }
  };

  fetchStockInHand();
}, [assetsInputRow.partNumber]);


useEffect(() => {
  const fetchStockInHand = async () => {
    if (!inputRow.partNumber.trim()) return;

    try {
      const res = await fetch(GAS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          action: "getStockForPartNumber",
          partNumber: inputRow.partNumber.trim(),
        }),
      });

      const result = await res.json();
      if (result.success) {
        setInputRow(prev => ({
          ...prev,
          stockInHand: result.stockInHand.toString(),
        }));
      } else {
        setInputRow(prev => ({
          ...prev,
          stockInHand: "0",
        }));
      }
    } catch (err) {
      console.error("Error fetching stock (Spare Parts):", err);
    }
  };

  fetchStockInHand();
}, [inputRow.partNumber]);




  const handleSubmit = async (values) => {
    const {
      productCategory,
      machines,
      immSeries,
      maSeries,
      juSeries,
      jeSeries,
      veSeries,
      zeSeries,
      haSeries,
      auxiliaries,
      assets,
      consumables,
      tools,
    } = values;

   

    try {
      setLoading(true);

      const rowLockResponse = await fetch(GAS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ action: "getRowLock" }),
      });

      const { rowIndex } = await rowLockResponse.json();
      let currentRow = parseInt(rowIndex || "3", 10);

      const maxLength = Math.max(
        machineDataSource.length,
        auxiliariesDataSource.length,
        assetsDataSource.length,
        dataSource.length
      );

      for (let i = 0; i < maxLength; i++) {
        const machine = machineDataSource[i] || {};
        const auxiliary = auxiliariesDataSource[i] || {};
        const asset = assetsDataSource[i] || {};
        const spare = dataSource[i] || {};

        const formData = new URLSearchParams({
          action: "addProductCategories",
          recordType: "machine",
          rowIndex: currentRow.toString(),

          // Machine Type Info
          machines,
          immSeries: immSeries || "-",
          maSeries: maSeries || "-",
          juSeries: juSeries || "-",
          jeSeries: jeSeries || "-",
          veSeries: veSeries || "-",
          zeSeries: zeSeries || "-",
          haSeries: haSeries || "-",

          // Machine Details
          machinePartNumber: machine.partNumber || "-",
          machineDescription: machine.description || "-",
          machineQuantity: machine.quantity || "-",
          machineStockInHand: machine.stockInHand || "100",
          machineNote: machine.note || "-",

          consumables: i === 0 ? consumables || "" : "",
          tools: i === 0 ? tools || "" : "",

          // consumables: i === 0 && consumables ? consumables : "",
          // tools: i === 0 && tools ? tools : "",

          // auxiliaries:
          //   i === 0
          //     ? Array.isArray(auxiliaries)
          //       ? auxiliaries.join(" / ")
          //       : auxiliaries || ""
          //     : "",

          auxiliaries: Array.isArray(auxiliaries)
            ? auxiliaries.join(" / ")
            : auxiliaries || "",

          auxPartNumber: auxiliary.partNumber || "-",
          auxDescription: auxiliary.description || "-",
          auxQuantity: auxiliary.quantity || "-",
          auxStockInHand: auxiliary.stockInHand || "100",
          auxNote: auxiliary.note || "-",

          // assets: i === 0 ? assets || "-" : "",
          assets: assets || "-",

          assetPartNumber: asset.partNumber || "-",
          assetDescription: asset.description || "-",
          assetQuantity: asset.quantity || "-",
          assetStockInHand: asset.stockInHand || "100",
          assetNote: asset.note || "-",

          sparePartNumber: spare.partNumber || "-",
          spareDescription: spare.description || "-",
          spareQuantity: spare.quantity || "-",
          spareStockInHand: spare.stockInHand || "100",
          spareNote: spare.note || "-",
        });

        console.log(
          `📤 Submitting row ${currentRow}:`,
          Object.fromEntries(formData.entries())
        );

        await fetch(GAS_URL, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formData.toString(),
        });

        currentRow++;
      }

      if (maxLength === 0 && (consumables || tools)) {
        const formData = new URLSearchParams({
          action: "addProductCategories",
          recordType: "general",
          rowIndex: currentRow.toString(),
          machines: machines || "-",
          immSeries: immSeries || "-",
          maSeries: maSeries || "-",
          juSeries: juSeries || "-",
          jeSeries: jeSeries || "-",
          veSeries: veSeries || "-",
          zeSeries: zeSeries || "-",
          haSeries: haSeries || "-",
          auxiliaries: Array.isArray(auxiliaries)
            ? auxiliaries.join(" / ")
            : auxiliaries || "",
          assets: assets || "-",
          consumables: consumables || "-",
          tools: tools || "-",
        });

        console.log(
          `📤 Submitting (consumables/tools only) row ${currentRow}:`,
          Object.fromEntries(formData.entries())
        );

        await fetch(GAS_URL, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formData.toString(),
        });

        currentRow++;
      }

      await fetch(GAS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ action: "finalizeRowLock" }),
      });

      message.success("Product categories submitted successfully.");
      form.resetFields();
      setMachineDataSource([]);
      setAuxiliariesDataSource([]);
      setAssetsDataSource([]);
      setDataSource([]);
    } catch (err) {
      console.error("Submission failed:", err);
      message.error("Something went wrong. Check console.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    if (
      !inputRow.partNumber &&
      !inputRow.description &&
      !inputRow.quantity &&
      !inputRow.note
    )
      return;

    const newData = { key: Date.now(), ...inputRow };
    setDataSource([...dataSource, newData]);
    setInputRow({ partNumber: "", description: "", quantity: "", stockInHand: "", note: "" });
  };

  const handleDelete = (key) => {
    setDataSource(dataSource.filter((item) => item.key !== key));
  };

  const columns = [
    {
      title: "Part Number",
      dataIndex: "partNumber",
      render: (_, record) =>
        record.isInput ? (
          <Input
            placeholder="Enter part number"
            value={inputRow.partNumber}
            onChange={(e) =>
              setInputRow({ ...inputRow, partNumber: e.target.value })
            }
          />
        ) : (
          record.partNumber
        ),
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (_, record) =>
        record.isInput ? (
          <Input.TextArea
            autoSize={{ minRows: 1, maxRows: 1 }}
            placeholder="Enter description"
            value={inputRow.description}
            onChange={(e) =>
              setInputRow({ ...inputRow, description: e.target.value })
            }
          />
        ) : (
          record.description
        ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (_, record) =>
        record.isInput ? (
          <Input
            placeholder="Qty"
            value={inputRow.quantity}
            onChange={(e) =>
              setInputRow({ ...inputRow, quantity: e.target.value })
            }
          />
        ) : (
          record.quantity
        ),
    },
    {
  title: "Stock in Hand",
  dataIndex: "stockInHand",
  render: (_, record) =>
    record.isInput ? (
      // <Input
      //   placeholder="Stock in hand"
      //   value={inputRow.stockInHand}
      //   onChange={(e) =>
      //     setInputRow({ ...inputRow, stockInHand: e.target.value })
      //   }
      // />
       <Input value={100} disabled />
    ) : (
      record.stockInHand || "-"
    ),
},

    {
      title: "Note",
      dataIndex: "note",
      render: (_, record) =>
        record.isInput ? (
          <Input.TextArea
            autoSize={{ minRows: 1, maxRows: 1 }}
            placeholder="Enter note"
            value={inputRow.note}
            onChange={(e) => setInputRow({ ...inputRow, note: e.target.value })}
          />
        ) : (
          record.note
        ),
    },
    {
      title: "Action",
      render: (_, record) =>
        record.isInput ? (
          <Button className="addButton ps-4 pe-4" onClick={handleAdd}>
            Add
          </Button>
        ) : (
          <Button
            className="deleteButton ps-3 pe-3"
            onClick={() => handleDelete(record.key)}
          >
            Delete
          </Button>
        ),
    },
  ];

  const displayData = [{ key: "input", isInput: true }, ...dataSource];

  const displayAuxiliariesData = [
    { key: "input", isInput: true },
    ...auxiliariesDataSource,
  ];

  const handleAuxiliariesAdd = () => {
    if (
      !auxiliariesInputRow.partNumber &&
      !auxiliariesInputRow.description &&
      !auxiliariesInputRow.quantity &&
      !auxiliariesInputRow.note
    )
      return;

    const newData = { key: Date.now(), ...auxiliariesInputRow };
    setAuxiliariesDataSource([...auxiliariesDataSource, newData]);
    setAuxiliariesInputRow({
      partNumber: "",
      description: "",
      quantity: "",
      note: "",
    });
  };

  const handleAuxiliariesDelete = (key) => {
    setAuxiliariesDataSource(
      auxiliariesDataSource.filter((item) => item.key !== key)
    );
  };

  const auxiliariesColumns = [
    {
      title: "Part Number",
      dataIndex: "partNumber",
      render: (_, record) =>
        record.isInput ? (
          <Input
            placeholder="Enter part number"
            value={auxiliariesInputRow.partNumber}
            onChange={(e) =>
              setAuxiliariesInputRow({
                ...auxiliariesInputRow,
                partNumber: e.target.value,
              })
            }
          />
        ) : (
          record.partNumber
        ),
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (_, record) =>
        record.isInput ? (
          <Input.TextArea
            autoSize={{ minRows: 1, maxRows: 1 }}
            placeholder="Enter description"
            value={auxiliariesInputRow.description}
            onChange={(e) =>
              setAuxiliariesInputRow({
                ...auxiliariesInputRow,
                description: e.target.value,
              })
            }
          />
        ) : (
          record.description
        ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (_, record) =>
        record.isInput ? (
          <Input
            placeholder="Qty"
            value={auxiliariesInputRow.quantity}
            onChange={(e) =>
              setAuxiliariesInputRow({
                ...auxiliariesInputRow,
                quantity: e.target.value,
              })
            }
          />
        ) : (
          record.quantity
        ),
    },
    {
      title: "Stock in Hand",
      dataIndex: "stockInHand",
      render: (_, record) =>
        record.isInput ? (
          // <Input
          //   placeholder="Stock in hand"
          //   value={machineinputRow.stockInHand || ""}
          //   onChange={(e) =>
          //     setMachineInputRow({
          //       ...machineinputRow,
          //       stockInHand: e.target.value,
          //     })
          //   }
          // />
          <Input value={100} disabled />
        ) : (
          record.stockInHand || "-"
        ),
    },
    {
      title: "Note",
      dataIndex: "note",
      render: (_, record) =>
        record.isInput ? (
          <Input.TextArea
            autoSize={{ minRows: 1, maxRows: 1 }}
            placeholder="Enter note"
            value={auxiliariesInputRow.note}
            onChange={(e) =>
              setAuxiliariesInputRow({
                ...auxiliariesInputRow,
                note: e.target.value,
              })
            }
          />
        ) : (
          record.note
        ),
    },
    {
      title: "Action",
      render: (_, record) =>
        record.isInput ? (
          <Button
            className="addButton ps-4 pe-4"
            onClick={handleAuxiliariesAdd}
          >
            Add
          </Button>
        ) : (
          <Button
            className="deleteButton ps-3 pe-3"
            onClick={() => handleAuxiliariesDelete(record.key)}
          >
            Delete
          </Button>
        ),
    },
  ];

  const displayAssetsData = [
    { key: "input", isInput: true },
    ...assetsDataSource,
  ];

  const handleAssetsAdd = () => {
    if (
      !assetsInputRow.partNumber &&
      !assetsInputRow.description &&
      !assetsInputRow.quantity &&
      !assetsInputRow.note
    )
      return;

    const newData = { key: Date.now(), ...assetsInputRow };
    setAssetsDataSource([...assetsDataSource, newData]);
    setAssetsInputRow({
      partNumber: "",
      description: "",
      quantity: "",
      note: "",
    });
  };

  const handleAssetsDelete = (key) => {
    setAssetsDataSource(assetsDataSource.filter((item) => item.key !== key));
  };

  const assetsColumns = [
    {
      title: "Part Number",
      dataIndex: "partNumber",
      render: (_, record) =>
        record.isInput ? (
          <Input
            placeholder="Enter part number"
            value={assetsInputRow.partNumber}
            onChange={(e) =>
              setAssetsInputRow({
                ...assetsInputRow,
                partNumber: e.target.value,
              })
            }
          />
        ) : (
          record.partNumber
        ),
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (_, record) =>
        record.isInput ? (
          <Input.TextArea
            autoSize={{ minRows: 1, maxRows: 1 }}
            placeholder="Enter description"
            value={assetsInputRow.description}
            onChange={(e) =>
              setAssetsInputRow({
                ...assetsInputRow,
                description: e.target.value,
              })
            }
          />
        ) : (
          record.description
        ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (_, record) =>
        record.isInput ? (
          <Input
            placeholder="Qty"
            value={assetsInputRow.quantity}
            onChange={(e) =>
              setAssetsInputRow({
                ...assetsInputRow,
                quantity: e.target.value,
              })
            }
          />
        ) : (
          record.quantity
        ),
    },
    {
      title: "Stock in Hand",
      dataIndex: "stockInHand",
      render: (_, record) =>
        record.isInput ? (
          // <Input
          //   placeholder="Stock in hand"
          //   value={machineinputRow.stockInHand || ""}
          //   onChange={(e) =>
          //     setMachineInputRow({
          //       ...machineinputRow,
          //       stockInHand: e.target.value,
          //     })
          //   }
          // />
          <Input value={100} disabled />
        ) : (
          record.stockInHand || "-"
        ),
    },
    {
      title: "Note",
      dataIndex: "note",
      render: (_, record) =>
        record.isInput ? (
          <Input.TextArea
            autoSize={{ minRows: 1, maxRows: 1 }}
            placeholder="Enter note"
            value={assetsInputRow.note}
            onChange={(e) =>
              setAssetsInputRow({ ...assetsInputRow, note: e.target.value })
            }
          />
        ) : (
          record.note
        ),
    },
    {
      title: "Action",
      render: (_, record) =>
        record.isInput ? (
          <Button className="addButton ps-4 pe-4" onClick={handleAssetsAdd}>
            Add
          </Button>
        ) : (
          <Button
            className="deleteButton ps-3 pe-3"
            onClick={() => handleAssetsDelete(record.key)}
          >
            Delete
          </Button>
        ),
    },
  ];

  const displayMachineData = [
    { key: "input", isInput: true },
    ...machineDataSource,
  ];

  const handleMachineAdd = () => {
    if (
      !machineinputRow.partNumber &&
      !machineinputRow.description &&
      !machineinputRow.quantity &&
      !machineinputRow.note
    )
      return;

    const newData = { key: Date.now(), ...machineinputRow };
    setMachineDataSource([...machineDataSource, newData]);
    setMachineInputRow({
      partNumber: "",
      description: "",
      quantity: "",
      note: "",
    });
  };

  const handleMachineDelete = (key) => {
    setMachineDataSource(machineDataSource.filter((item) => item.key !== key));
  };

  const machineColumns = [
    {
      title: "Part Number",
      dataIndex: "partNumber",
      render: (_, record) =>
        record.isInput ? (
          <Input
            placeholder="Enter part number"
            value={machineinputRow.partNumber}
            onChange={(e) =>
              setMachineInputRow({
                ...machineinputRow,
                partNumber: e.target.value,
              })
            }
          />
        ) : (
          record.partNumber
        ),
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (_, record) =>
        record.isInput ? (
          <Input.TextArea
            autoSize={{ minRows: 1, maxRows: 1 }}
            placeholder="Enter description"
            value={machineinputRow.description}
            onChange={(e) =>
              setMachineInputRow({
                ...machineinputRow,
                description: e.target.value,
              })
            }
          />
        ) : (
          record.description
        ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (_, record) =>
        record.isInput ? (
          <Input
            placeholder="Qty"
            value={machineinputRow.quantity}
            onChange={(e) =>
              setMachineInputRow({
                ...machineinputRow,
                quantity: e.target.value,
              })
            }
          />
        ) : (
          record.quantity
        ),
    },
    {
      title: "Stock in Hand",
      dataIndex: "stockInHand",
      render: (_, record) =>
        record.isInput ? (
          // <Input
          //   placeholder="Stock in hand"
          //   value={machineinputRow.stockInHand || ""}
          //   onChange={(e) =>
          //     setMachineInputRow({
          //       ...machineinputRow,
          //       stockInHand: e.target.value,
          //     })
          //   }
          // />
<Input
  value={machineinputRow.stockInHand || "0"}
  disabled
/>        ) : (
          record.stockInHand || "-"
        ),
    },
    {
      title: "Note",
      dataIndex: "note",
      render: (_, record) =>
        record.isInput ? (
          <Input.TextArea
            autoSize={{ minRows: 1, maxRows: 1 }}
            placeholder="Enter note"
            value={machineinputRow.note}
            onChange={(e) =>
              setMachineInputRow({ ...machineinputRow, note: e.target.value })
            }
          />
        ) : (
          record.note
        ),
    },
    {
      title: "Action",
      render: (_, record) =>
        record.isInput ? (
          <Button className="addButton ps-4 pe-4" onClick={handleMachineAdd}>
            Add
          </Button>
        ) : (
          <Button
            className="deleteButton ps-3 pe-3"
            onClick={() => handleMachineDelete(record.key)}
          >
            Delete
          </Button>
        ),
    },
  ];

  const styl = `.ant-form-item .ant-form-item-explain-error {
    color: #ff4d4f;
    font-weight: normal;
  }
  .ant-select-single .ant-select-selector .ant-select-selection-placeholder {
    transition: none;
    pointer-events: none;
    font-weight: normal;
  }
  
 .ant-cascader-dropdown.ant-select-dropdown {
    padding: 0;
    width: 60% !important;
    height: auto !important;
}
    .ant-form-item .ant-form-item-label >label {
    position: relative;
    display: inline-flex
;
    align-items: center;
    max-width: 100%;
    height: 32px;
    color: #0D3884;
    font-size: 14px;
}
.ant-form-item .ant-form-item-explain-error {
    color: #ff4d4f;
    font-weight: normal !important;
}    
 .ant-select-multiple .ant-select-selection-placeholder {
    position: absolute;
    top: 50%;
    inset-inline-start: 8px;
    inset-inline-end: 11px;
    transform: translateY(-50%);
    transition: all 0.3s;
    font-weight: normal;
}
     .ant-select-single .ant-select-selector .ant-select-selection-placeholder {
    transition: none;
    pointer-events: none;
    font-weight: normal;
}
   [class^="ant-table"] [class^="ant-table"], :where(.css-dev-only-do-not-override-mc1tut)[class*=" ant-table"] [class^="ant-table"], :where(.css-dev-only-do-not-override-mc1tut)[class^="ant-table"] [class*=" ant-table"], :where(.css-dev-only-do-not-override-mc1tut)[class*=" ant-table"] [class*=" ant-table"] {
    box-sizing: border-box;
    color: #0D3884 !important;
}
  `;

  return (
    <>
      <style>{styl}</style>
      <div className="container-fluid">
        <div className="container">
          <div>
            <h1
              className="text-center m-0 p-0 haitianColor mt-1 "
              style={{ fontSize: "36px" }}
            >
              Product Categories
            </h1>
            <p
              className="text-center m-0 p-0 haitianInventoryDescriptionText"
              style={{ color: "#0D3884" }}
            >
              (Add and manage your product categories with ease)
            </p>
          </div>

          <div className="row d-flex flex-row mt-4">
            <div className="d-flex flex-column flex-lg-row justify-content-lg-evenly productsCards rounded-4">
              <div className="col-12 p-3 p-lg-4  ">
                <div className="d-flex align-items-center gap-2 mb-1">
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      backgroundColor: "#e8f0fe",
                      borderRadius: "12px",
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faListCheck}
                      size="lg"
                      style={{ color: "#0D3884" }}
                    />
                  </div>
                  <div>
                    <div
                      className="fw-bold m-0 p-0"
                      style={{ fontSize: "20px", color: "#0D3884" }}
                    >
                      Categories Information
                    </div>
                    <div
                      className="m-0 p-0"
                      style={{ fontSize: "14px", color: "#0D3884" }}
                    >
                      Details about product categories
                    </div>
                  </div>
                </div>

                <div className="border border-1"></div>

                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleSubmit}
                  className="mt-3 mt-lg-3"
                >
                  <div className="row mt-3">
                    <div className="rounded-2 p-2">
                      <Form.Item
                        label="Product Category"
                        name="productCategory"
                        className="fw-bold"
                        rules={[
                          {
                            required: true,
                            message: "Please select a category",
                          },
                        ]}
                      >
                        <Select
                          placeholder="Select a category"
                          onChange={(value) => {
                            setSelectedCategory(value);
                            setSelectedMachine(null);
                            setSelectedIMMSeries(null);
                            setSelectedAssets(null);
                            setSelectedAuxiliaries(null);
                            setMachineDataSource([]);
                            setAuxiliariesDataSource([]);
                            setAssetsDataSource([]);
                            setDataSource([]);
                            form.setFieldsValue({
                              machines: undefined,
                              immSeries: undefined,
                              maSeries: undefined,
                              juSeries: undefined,
                              jeSeries: undefined,
                              veSeries: undefined,
                              zeSeries: undefined,
                              haSeries: undefined,
                              auxiliaries: undefined,
                              assets: undefined,
                              consumables: undefined,
                              tools: undefined,
                            });
                          }}
                        >
                          <Select.Option value="Machines">
                            Machines
                          </Select.Option>
                          <Select.Option value="Consumables">
                            Consumables (Stationery)
                          </Select.Option>
                          <Select.Option value="Tools">Tools</Select.Option>
                          <Select.Option value="Auxiliaries">
                            Auxiliaries
                          </Select.Option>
                          <Select.Option value="Assets">Assets</Select.Option>
                          <Select.Option value="SpareParts">
                            Spare Parts
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </div>

                    {selectedCategory === "Machines" && (
                      <div className="rounded-2 p-2">
                        <Form.Item
                          label="Machines"
                          name="machines"
                          className="fw-bold"
                          rules={[
                            {
                              required: true,
                              message: "Please select machine",
                            },
                          ]}
                        >
                          <Select
                            placeholder="Select a machine"
                            onChange={(value) => {
                              setSelectedMachine(value);
                              setMachineDataSource([]);
                              setSelectedIMMSeries(null);
                              form.setFieldsValue({
                                immSeries: undefined,
                                maSeries: undefined,
                                juSeries: undefined,
                                haSeries: undefined,
                              });
                            }}
                          >
                            <Select.Option value="IMM">IMM</Select.Option>
                            <Select.Option value="BMM">BMM</Select.Option>
                            <Select.Option value="EBM">EBM</Select.Option>
                            <Select.Option value="SBM">SBM</Select.Option>
                          </Select>
                        </Form.Item>

                        {selectedMachine === "IMM" && (
                          <>
                            <Form.Item
                              label="IMM Series"
                              name="immSeries"
                              className="fw-bold"
                              rules={[
                                {
                                  required: true,
                                  message: "Please select IMM series",
                                },
                              ]}
                            >
                              <Select
                                placeholder="Select IMM Series"
                                onChange={(value) => {
                                  setSelectedIMMSeries(value);
                                  setMachineDataSource([]);
                                  form.setFieldsValue({
                                    maSeries: undefined,
                                    juSeries: undefined,
                                    haSeries: undefined,
                                    jeSeries: undefined,
                                    veSeries: undefined,
                                    zeSeries: undefined,
                                  });
                                }}
                              >
                                {IMMSeriesOptions.map((opt) => (
                                  <Select.Option
                                    key={opt.value}
                                    value={opt.value}
                                  >
                                    {opt.label}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>

                            {selectedIMMSeries === "MA" && (
                              <Form.Item
                                label="MA Series"
                                name="maSeries"
                                className="fw-bold"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please select MA series",
                                  },
                                ]}
                              >
                                <Select placeholder="Select MA Series" >
                                  {MAOptions.map((item) => (
                                    <Select.Option key={item} value={item}>
                                      {item}
                                    </Select.Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            )}

                            {selectedIMMSeries === "JU" && (
                              <Form.Item
                                label="JU Series"
                                name="juSeries"
                                className="fw-bold"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please select JU series",
                                  },
                                ]}
                              >
                                <Select placeholder="Select JU Series">
                                  {JUOptions.map((item) => (
                                    <Select.Option key={item} value={item}>
                                      {item}
                                    </Select.Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            )}

                            {selectedIMMSeries === "HA" && (
                              <Form.Item
                                label="HA Series"
                                name="haSeries"
                                className="fw-bold"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please select HA series",
                                  },
                                ]}
                              >
                                <Select placeholder="Select HA Series">
                                  {HAOptions.map((item) => (
                                    <Select.Option key={item} value={item}>
                                      {item}
                                    </Select.Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            )}

                            {selectedIMMSeries === "JE" && (
                              <Form.Item
                                label="JE Series"
                                name="jeSeries"
                                className="fw-bold"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please select JE series",
                                  },
                                ]}
                              >
                                <Select placeholder="Select JE Series">
                                  {JEOptions.map((item) => (
                                    <Select.Option key={item} value={item}>
                                      {item}
                                    </Select.Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            )}

                            {selectedIMMSeries === "VE" && (
                              <Form.Item
                                label="VE Series"
                                name="veSeries"
                                className="fw-bold"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please select VE series",
                                  },
                                ]}
                              >
                                <Select placeholder="Select VE Series">
                                  {VEOptions.map((item) => (
                                    <Select.Option key={item} value={item}>
                                      {item}
                                    </Select.Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            )}
                            {selectedIMMSeries === "ZE" && (
                              <Form.Item
                                label="ZE Series"
                                name="zeSeries"
                                className="fw-bold"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please select ZE series",
                                  },
                                ]}
                              >
                                <Select placeholder="Select ZE Series">
                                  {ZEOptions.map((item) => (
                                    <Select.Option key={item} value={item}>
                                      {item}
                                    </Select.Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            )}
                          </>
                        )}

                        {selectedMachine && (
                          <div className="col-12">
                            <h6
                              className="haitianColor ms-1 text-decoration-underline"
                              style={{ fontWeight: "500" }}
                            >
                              Machines Details
                            </h6>
                            <Table
                              columns={machineColumns}
                              dataSource={displayMachineData}
                              pagination={false}
                              rowKey="key"
                              bordered
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {selectedCategory === "Consumables" && (
                      <div className="rounded-2 p-1 ">
                        <div className="col-12">
                          <Form.Item
                            label="Consumables (Stationery)"
                            name="consumables"
                            className="fw-bold"
                            rules={[
                              {
                                required: true,
                                message: "Please input consumables",
                              },
                            ]}
                          >
                            <Input placeholder="Enter consumables" />
                          </Form.Item>
                        </div>
                      </div>
                    )}

                    {selectedCategory === "Tools" && (
                      <div className="rounded-2 p-1 ">
                        <div className="col-12">
                          <Form.Item
                            label="Tools"
                            name="tools"
                            className="fw-bold"
                            rules={[
                              { required: true, message: "Please input tools" },
                            ]}
                          >
                            <Input placeholder="Enter tools" />
                          </Form.Item>
                        </div>
                      </div>
                    )}

                    {selectedCategory === "Auxiliaries" && (
                      <div className=" rounded-2 p-1 ">
                        <Form.Item
                          label="Auxiliaries"
                          name="auxiliaries"
                          className="fw-bold"
                          rules={[
                            {
                              required: true,
                              message: "Please select auxiliaries",
                            },
                          ]}
                        >
                          <div style={{ width: "100%" }}>
                            <Cascader
                              options={auxiliariesOptions}
                              placeholder="Select auxiliaries"
                              style={{ width: "100%" }}
                              value={form.getFieldValue("auxiliaries")}
                              onChange={(value) => {
                                form.setFieldsValue({ auxiliaries: value });
                                setSelectedAuxiliaries(value);
                              }}
                            />
                          </div>
                        </Form.Item>
                        {selectedAuxiliaries && (
                          <div className="col-12">
                            <h6
                              className="haitianColor ms-1 text-decoration-underline"
                              style={{ fontWeight: "500" }}
                            >
                              Auxiliaries Details
                            </h6>
                            <Table
                              bordered
                              columns={auxiliariesColumns}
                              dataSource={displayAuxiliariesData}
                              pagination={false}
                              rowKey="key"
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {selectedCategory === "Assets" && (
                      <div className=" rounded-2 p-1 ">
                        <Form.Item
                          label="Assets"
                          name="assets"
                          className="fw-bold"
                          rules={[
                            { required: true, message: "Please select assets" },
                          ]}
                        >
                          <Select
                            placeholder="Select an asset"
                            onChange={(value) => {
                              setSelectedAssets(value);
                            }}
                          >
                            <Select.Option value="Furniture">
                              Furniture
                            </Select.Option>
                            <Select.Option value="Vehicles">
                              Vehicles
                            </Select.Option>
                            <Select.Option value="IT">IT</Select.Option>
                            <Select.Option value="Utilities">
                              Utilities
                            </Select.Option>
                          </Select>
                        </Form.Item>
                        {selectedAssets && (
                          <div className="col-12">
                            <h6 className="haitianColor ms-1 text-decoration-underline">
                              Assets Details
                            </h6>
                            <Table
                              bordered
                              columns={assetsColumns}
                              dataSource={displayAssetsData}
                              pagination={false}
                              rowKey="key"
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {selectedCategory === "SpareParts" && (
                      <div className=" rounded-2 p-1 ">
                        <div className="col-12">
                          <h6 className="haitianColor fw-bold">Spare Parts</h6>
                          <Table
                            columns={columns}
                            dataSource={displayData}
                            pagination={false}
                            rowKey="key"
                            bordered
                          />
                        </div>
                      </div>
                    )}

                    <div className="col-12 text-center mt-4 mb-3">
                      <Button
                        htmlType="submit"
                        size="large"
                        className="submitButton mt-2"
                        disabled={loading}
                        loading={loading}
                      >
                        {loading
                          ? "Submitting Categories..."
                          : "Submit Categories"}
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
