"use client";

import Container from "@/components/home/Container";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <form className="p-6 pt-0 grid gap-4 w-full">
      <div className="py-8">
        <h1 className="text-gray-500 font-medium text-4xl text-center py-16">
          Data Kemenkes
        </h1>
      </div>
      <Container>
        <div className="py-16 max-w-5xl mx-auto  lex justify-center">
          <Box className=" space-y-8 w-full px-16">
            <Box className="flex gap-8 w-full">
              <FormControl fullWidth variant="outlined">
                <InputLabel id="provinsi-label">
                  Provinsi domisili saat ini
                </InputLabel>
                <Select
                  labelId="provinsi-label"
                  // value={provinsi}
                  // onChange={handleProvinsiChange}
                  label="Provinsi domisili saat ini"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"provinsi1"}>Provinsi 1</MenuItem>
                  <MenuItem value={"provinsi2"}>Provinsi 2</MenuItem>
                  <MenuItem value={"provinsi3"}>Provinsi 3</MenuItem>
                  {/* Add more provinces as needed */}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </div>
      </Container>
    </form>
  );
};

export default page;
