export type ConfigValue = StringValue | UserImageValue | TextureValue | ColorValue | PartValue | BuildingImageValue;

export type StringValue = {
    type: 'string';
    value: string;
};

export type UserImageValue = {
    type: 'userImage';
    value: {
        url: string;
        offsetX: number;
        offsetY: number;
    };
};

export type TextureValue = {
    type: 'texture';
    value: {
        code: string;
        imageUrl: string;
    };
};

export type ColorValue = {
    type: 'color';
    value: {
        name: string;
        colorCode: string;
    };
};

export type PartValue = {
    type: 'part',
    value: {
        name: string;
        code: string;
    }
}


export type BuildingImageValue = {
    type: 'buildingImage';
    value: {
        url: string;
        imageWidthPixels: number,
        imageHeightPixels: number,
        imageWidthMeters: number,
        imageHeightMeters: number,
    };
};


export function isStringValue(value: ConfigValue) : value is StringValue {
    return value.type === 'string';
}

export function isUserIageValue(value: ConfigValue) : value is UserImageValue {
    return value.type === 'userImage';
}

export function isTextureValue(value: ConfigValue) : value is TextureValue {
    return value.type === 'texture';
}

export function isColorValue(value: ConfigValue) : value is ColorValue {
    return value.type === 'color';
}

export function isPartValue(value: ConfigValue) : value is PartValue {
    return value.type === 'part';
}

export function isBuildingImageValue(value: ConfigValue) : value is BuildingImageValue {
    return value.type === 'buildingImage';
}