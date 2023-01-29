import {
  isNumber,
  max,
  min,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

export const IsLineString = (validationOptions?: ValidationOptions) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isLineString',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [propertyName],
      options: {
        message: `'${propertyName}' is not valid coordinates list`,
        ...validationOptions,
      },
      validator: {
        validate(coords: any) {
          if (!(coords instanceof Array)) {
            return false;
          }

          const isValid = coords.every((coord) => {
            if (!(coord instanceof Array) || coord.length !== 2) {
              return false;
            }
            const [lon, lat] = coord;
            return isValidLon(lon) && isValidLat(lat);
          });

          return isValid;
        },
      },
    });
  };
};

function isValidLon(lon: unknown) {
  return isNumber(lon) && min(lon, -180) && max(lon, 180);
}

function isValidLat(lat: unknown) {
  return isNumber(lat) && min(lat, -90) && max(lat, 90);
}
