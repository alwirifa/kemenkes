import * as z from "zod";

export const formSchema = z
  .object({
    accountType: z.enum(["personal", "company"]),
    companyName: z.string().optional(),

    str_type: z.enum(["sudah", "belum", ""]).refine((val) => val !== "", {
      message: "STR harus dipilih",
    }),
    tanggal_str: z.string().optional(),

    status_kerja: z
      .enum(["Bekerja", "Melanjutkan Pendidikan", "Belum Bekerja", ""])
      .refine((val) => val !== "", {
        message: "Status saat ini harus dipilih",
      }),
    tanggal_kerja: z.string().optional(),

    lokasi_kerja: z.enum(["Indonesia", "Luar Negeri", ""]).optional(),
    // luar negeri
    negara_kerja: z.string().optional(),
    sk_internasional_type: z
      .enum([
        "NCLEX",
        "Prometric",
        "Tidak memiliki sertifikasi internasional",
        "skyanglain",
        "",
      ])
      .optional(),
    sk_internasional: z.string().optional(),

    sertifikat_bahasa_type: z
      .enum([
        "Bahasa Jepang",
        "Bahasa Jerman",
        "Bahasa Inggris",
        "Bahasa Arab",
        "Bahasa Belanda",
        "Bahasa Korea",
        "Bahasa yang lain",
        "",
      ])
      .optional(),
    sertifikat_bahasa: z.string().optional(),
    tahun_mulai_kerja: z.string().optional(),
    skema_penempatan_ln: z.string().optional(),
    nama_tempat_kerja: z.string().optional(),
    jabatan: z.string().optional(),

    // indonesia
    instansi_tempat_kerja_type: z
      .enum([
        "Puskesmas",
        "RS Pemerintah",
        "RS Swasta",
        "Klinik Swasta",
        "Non Fayankes",
        "yanglain",
        "",
      ])
      .optional(),
    instansi_tempat_kerja: z.string().optional(),
    provinsi_tempat_kerja: z.string().optional(),
  })

  // ==========================================================
  // STR
  .refine(
    (data) => {
      if (data.str_type === "sudah") {
        return !!data.tanggal_str;
      }
      return true;
    },
    {
      message: "Tanggal STR tidak boleh kosong",
      path: ["tanggal_str"],
    }
  )
  // STATUS
  .refine(
    (data) => {
      if (data.status_kerja === "Bekerja") {
        return !!data.tanggal_kerja;
      }
      return true;
    },
    {
      message: "Tanggal kerja perlu diisi",
      path: ["tanggal_kerja"],
    }
  )
  .refine(
    (data) => {
      if (data.status_kerja === "Bekerja") {
        return !!data.lokasi_kerja;
      }
      return true;
    },
    {
      message: "Lokasi tempat kerja perlu diisi",
      path: ["lokasi_kerja"],
    }
  )
  .refine((data) => {
    if (data.status_kerja === "Bekerja" && data.lokasi_kerja === "Indonesia") {
      data.negara_kerja = "Indonesia";
    }
    return true;
  })
  .refine(
    (data) => {
      if (
        data.status_kerja === "Bekerja" &&
        data.lokasi_kerja === "Luar Negeri"
      ) {
        return !!data.negara_kerja;
      }
      return true;
    },
    {
      message: "Negara kerja perlu diisi",
      path: ["negara_kerja"],
    }
  )

  // LOKASI INDONESIA
  .refine(
    (data) => {
      if (
        data.status_kerja === "Bekerja" &&
        data.lokasi_kerja === "Indonesia"
      ) {
        return !!data.instansi_tempat_kerja_type;
      }
      return true;
    },
    {
      message: "Instansi tempat kerja perlu diisi",
      path: ["instansi_tempat_kerja_type"],
    }
  )
  .refine((data) => {
    if (data.status_kerja === "Bekerja" && data.lokasi_kerja === "Indonesia") {
      switch (data.instansi_tempat_kerja_type) {
        case "Puskesmas":
          data.instansi_tempat_kerja = "Puskesmas";
          break;
        case "RS Pemerintah":
          data.instansi_tempat_kerja = "RS Pemerintah";
          break;
        case "RS Swasta":
          data.instansi_tempat_kerja = "RS Swasta";
          break;
        case "Klinik Swasta":
          data.instansi_tempat_kerja = "Klinik Swasta";
          break;
        case "Non Fayankes":
          data.instansi_tempat_kerja = "Non Fayankes";
          break;
      }
    }
    return true;
  })
  .refine(
    (data) => {
      if (data.instansi_tempat_kerja_type === "yanglain") {
        return !!data.instansi_tempat_kerja;
      }
      return true;
    },
    {
      message: "Intansi tempat kerja perlu diisi",
      path: ["instansi_tempat_kerja"],
    }
  )
  .refine(
    (data) => {
      if (
        data.status_kerja === "Bekerja" &&
        data.lokasi_kerja === "Indonesia"
      ) {
        return !!data.provinsi_tempat_kerja;
      }
      return true;
    },
    {
      message: "Instansi tempat kerja perlu diisi",
      path: ["provinsi_tempat_kerja"],
    }
  )

  // DEFINE DATA SISA DISINI
  .refine(
    (data) => {
      if (
        data.status_kerja === "Bekerja" &&
        (data.lokasi_kerja === "Luar Negeri" ||
          data.lokasi_kerja === "Indonesia")
      ) {
        return !!data.nama_tempat_kerja;
      }
      return true;
    },
    {
      message: "Nama tempat kerja perlu diisi",
      path: ["nama_tempat_kerja"],
    }
  )
  .refine(
    (data) => {
      if (
        data.status_kerja === "Bekerja" &&
        data.lokasi_kerja === "Luar Negeri"
      ) {
        return !!data.jabatan;
      }
      return true;
    },
    {
      message: "Jabatan kerja perlu diisi",
      path: ["jabatan"],
    }
  )
  .refine(
    (data) => {
      if (
        data.status_kerja === "Bekerja" &&
        data.lokasi_kerja === "Luar Negeri"
      ) {
        return !!data.skema_penempatan_ln;
      }
      return true;
    },
    {
      message: "Skema penempatan kerja perlu diisi",
      path: ["skema_penempatan_ln"],
    }
  )
  .refine(
    (data) => {
      if (
        data.status_kerja === "Bekerja" &&
        data.lokasi_kerja === "Luar Negeri"
      ) {
        return !!data.tahun_mulai_kerja;
      }
      return true;
    },
    {
      message: "Tahun mulai kerja perlu diisi",
      path: ["tahun_mulai_kerja"],
    }
  )
  .refine(
    (data) => {
      if (
        data.status_kerja === "Bekerja" &&
        data.lokasi_kerja === "Luar Negeri"
      ) {
        return !!data.sk_internasional_type;
      }
      return true;
    },
    {
      message: "Negara kerja perlu diisi",
      path: ["sk_internasional_type"],
    }
  )
  .refine(
    (data) => {
      if (
        data.status_kerja === "Bekerja" &&
        data.lokasi_kerja === "Luar Negeri"
      ) {
        return !!data.sertifikat_bahasa_type;
      }
      return true;
    },
    {
      message: "sertifikat bahasa perlu diisi",
      path: ["sertifikat_bahasa_type"],
    }
  )

  // SK INTERNASIONAL
  .refine(
    (data) => {
      if (
        data.status_kerja === "Bekerja" &&
        data.lokasi_kerja === "Luar Negeri" &&
        data.sk_internasional_type === "skyanglain"
      ) {
        return !!data.sk_internasional;
      }
      return true;
    },
    {
      message: "Sertifikasi Internasional Lainnya perlu diisi",
      path: ["sk_internasional"],
    }
  )
  .refine((data) => {
    if (
      data.status_kerja === "Bekerja" &&
      data.lokasi_kerja === "Luar Negeri" &&
      data.sk_internasional_type === "NCLEX"
    ) {
      data.sk_internasional = "NCLEX";
    } else if (
      data.status_kerja === "Bekerja" &&
      data.lokasi_kerja === "Luar Negeri" &&
      data.sk_internasional_type === "Prometric"
    ) {
      data.sk_internasional = "Prometric";
    } else if (
      data.status_kerja === "Bekerja" &&
      data.lokasi_kerja === "Luar Negeri" &&
      data.sk_internasional_type === "Tidak memiliki sertifikasi internasional"
    ) {
      data.sk_internasional = "Tidak memiliki sertifikasi internasional";
    }
    return true;
  })

  // SERTIFIKAT BAHASA
  .refine(
    (data) => {
      if (data.sertifikat_bahasa_type === "Bahasa yang lain") {
        return !!data.sertifikat_bahasa;
      }
      return true;
    },
    {
      message: "Sertifikat Bahasa Lainya perlu diisi",
      path: ["sertifikat_bahasa"],
    }
  )
  .refine((data) => {
    if (
      data.status_kerja === "Bekerja" &&
      data.lokasi_kerja === "Luar Negeri"
    ) {
      switch (data.sertifikat_bahasa_type) {
        case "Bahasa Jepang":
          data.sertifikat_bahasa = "Bahasa Jepang";
          break;
        case "Bahasa Jerman":
          data.sertifikat_bahasa = "Bahasa Jerman";
          break;
        case "Bahasa Inggris":
          data.sertifikat_bahasa = "Bahasa Inggris";
          break;
        case "Bahasa Arab":
          data.sertifikat_bahasa = "Bahasa Arab";
          break;
        case "Bahasa Belanda":
          data.sertifikat_bahasa = "Bahasa Belanda";
          break;
        case "Bahasa Korea":
          data.sertifikat_bahasa = "Bahasa Korea";
          break;
      }
    }
    return true;
  })
  .refine(
    (data) => {
      if (data.accountType === "company") {
        return !!data.companyName;
      }
      return true;
    },
    {
      message: "Company name is required",
      path: ["companyName"],
    }
  );

export type FormData = z.infer<typeof formSchema>;
