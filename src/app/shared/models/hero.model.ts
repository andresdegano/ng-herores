export interface HeroModel {
    name: string,
    superPower: string,
    strength: number
}

export interface Hero extends HeroModel {
    id: string,
}