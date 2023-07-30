export const errors = {
  bad: {
    cause: "bad_reuest",
    code: 400,
    message: "Došlo je do greške u slanju zahteva.",
  },
  unauthorized: {
    cause: "unauthorized",
    code: 401,
    message: "Korisnik nije ulogovan",
  },
  forbidden: {
    cause: "forbidden",
    code: 403,
    message: "Korisnik nema ovlašćenja da pristupi sadržaju",
  },
  not_found: {
    cause: "not_found",
    code: 404,
    message: "Traženi sadržaj ne postoji",
  },
  server: {
    cause: "server_error",
    code: 500,
    message: "Došlo je do greške na serveru"
  },
  unknown: {
    cause: "unknown",
    code: '',
    message: "Došlo je do greške",
  },
};

export const checkResponse = (res) => {
  if (!res.ok) {
    switch (res.status) {
      case 400: {
        throw errors.bad;
      }
      case 401: {
        throw errors.unauthorized;
      }
      case 403: {
        throw errors.forbidden;
      }
      case 404: {
        throw errors.not_found;
      }
      case 500: {
        throw errors.server;
      }
      default: {
        throw errors.unknown;
      }
    }
  }
};
