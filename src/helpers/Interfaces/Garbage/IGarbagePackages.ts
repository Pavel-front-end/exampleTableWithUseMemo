export interface IGarbagePackages {
    packages: IGarbagePackage[]
}

export interface GarbagePackageBase {
    packageId: number
    packageName: IPackageName
    packageSize: IPackageSize
    wasteTypeId: number
    wasteTypeName: WasteTypeName
}

export interface IGarbagePackage extends GarbagePackageBase{
    packageTokenAmount?: string
    wasteTypeTokenAmount?: string
}

type IPackageName = 'small' | 'medium' | 'large'

type IPackageSize = '4-30 gal' | '56+ gal' | '31-55 gal'

type WasteTypeName = 'plastic' | 'glass' | 'metal' | 'paper' | 'mixed'
