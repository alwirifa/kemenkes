import React from "react";
import Container from "../home/Container";
import {
  TextField,
  MenuItem,
  Button,
  Select,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";

const KuesionerForm = () => {
  const [provinsi, setProvinsi] = React.useState("");

  // const handleProvinsiChange = (event) => {
  //   setProvinsi(event.target.value);
  // };

  return (
    <form className="p-6 pt-0 grid gap-4 w-full">
      <div className="py-8">
        <h1 className="text-gray-500 font-medium text-4xl text-center">Isi Kuesioner</h1>
      </div>
      <Container>
        <div className="border py-16 max-w-5xl mx-auto  rounded-md shadow-md flex justify-center">

       
        <Box className=" space-y-8 w-full px-16">
          <Box className="flex gap-8 w-full">
            <TextField
              fullWidth
              label="Nama Lengkap"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Jenis Kelamin"
              variant="outlined"
            />
          </Box>

          <Box className="flex gap-8 w-full">
            <TextField
              fullWidth
              label="Tanggal Lahir"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <FormControl fullWidth variant="outlined">
              <InputLabel id="provinsi-label">Provinsi domisili saat ini</InputLabel>
              <Select
                labelId="provinsi-label"
                value={provinsi}
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

          <Box className="flex gap-8 w-full">
            <TextField
              fullWidth
              label="Nomor Whatsapp Aktif"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="E-mail Aktif"
              variant="outlined"
            />
          </Box>

          <div
            color="primary"
            className="text-sm px-4 py-2 bg-primary text-white mt-4 rounded-md text-center max-w-max"
          >
            Selanjutnya
          </div>
        </Box>
        </div>
      </Container>
    </form>
  );
};

export default KuesionerForm;
