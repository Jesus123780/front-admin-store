import styled, { css } from 'styled-components'
import { 
  BGColor, 
  PLVColor, 
  PSColor,
  PVColor, 
  SECColor
} from '../../public/colors'

export const ContentTitles = styled.div`
    display: flex;
    align-items:center;
    margin: 10px 0;
    padding-left: 15px;
    ${({ column }) => {return column && css`
        flex-direction: column;
        justify-content:center;
        align-items:flex-start};
    `} }
    justify-content: ${({ justify }) => {return justify ? justify : 'start'}};
    @media (max-width: 768px) {
        width: 100px;
        max-width: 100px;
        min-width: 100px;
        padding: 0;
    }
    @media (max-width: 576px) {
        width: 70px;
        max-width: 70px;
        min-width: 70px;
    }
`
export const Text = styled.span`
    font-size: ${({ size }) => {return size || '12px'}};
    text-align:  ${({ align }) => {return align || 'start'}};
    ${({ lineHeight }) => {return lineHeight && css`line-height: ${lineHeight};`}}
    margin: ${({ margin }) => {return margin || 'auto'}};
    justify-content: ${({ justify }) => {return justify || 'flex-start'}};
    display: flex;
    font-family: ${({ font }) => {return font || 'PFont-Regular'}};
    ${({ paddingLeft }) => {return paddingLeft && css`padding-left: ${paddingLeft};`}}
    @media (max-width: 768px) {
        font-size: 12px;
        margin: 0;
    }
    `

export const ButtonStatus = styled.button`
    color: ${({ status }) => {return status === 'Active' ? `${'#95ef20'}` : status === 'Danger' ? `${'#f11d1d'}` : '#eb8e20'}};
    border: ${({ status }) => {return status === 'Active' ? `1px solid ${'#95ef20'}` : status === 'Danger' ? `1px solid${'#f11d1d'}` : '1px solid #eb8e20'}};
    background-color: ${BGColor};
    padding: 6px;
    cursor: pointer;
    border-radius: 6px;
    ${({ margin }) => {return margin && css`margin: ${margin};`}}
    @media (max-width: 768px) {
        font-size: 12px;
        margin: 0;
    }

`
export const ButtonCode = styled.button`
    border: 1px solid #ccc;
    background-color: ${BGColor};
    padding: 6px 15px;
    border-radius: 6px;
    @media (max-width: 768px) {
        font-size: 12px;
        margin: 0;
    }
`
export const ContentTable = styled.div`
    overflow: initial;
`
export const Pagination = styled.div`
    margin-top: 30px;
    color: ${`${SECColor}78`};
`
export const WrapperTable = styled.div`
   display: grid;
    grid-template-columns: ${({ columnWidth }) => {return columnWidth ? columnWidth?.map(x => {return `${x} `}) : '1fr'}}; 
    height: auto;
    align-items: center;
    margin: 0 auto;
    place-content: center;
    border-bottom: 1px solid #f0f0f0;
    :hover {
        background-color: #e9e9e933;
        :first-child {
            background-color: #fff;
        }
    }
`

export const Image = styled.img`
    height: 60px;
    object-fit: contain;
    width: 60px;
    @media (max-width: 768px) {
        display: none;
    }
    ${props => {return props.radius && css`
        height: 40px;
        object-fit: contain;
        width: 40px;
        border-radius: 50%;
    `}}
`
export const ButtonAction = styled.button`
    position: relative;
    background-color: transparent;
    cursor: pointer;
    z-index: 99;
`
export const ListActions = styled.div`
    position: relative;
    background-color: ${BGColor};
    display: flex;
    flex-direction: column;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    cursor: pointer;
    position: absolute;
    z-index: 9;
    padding: 10px;
    ${({ openMenuActions }) => {return openMenuActions
    ? css`
            height: auto;
            width: 200px;
            border-radius: 5px;
            left: -164px;
            top: 25px;
            opacity: 1;
            z-index: 999;
            `
    : css`
        opacity: 0;      
    z-index: -99;

              `} }
`
export const ContentItems = styled.div`
    display: flex;
    align-items:center;
    position: relative;
    margin: 10px 0;
    padding-left: ${({ paddingLeft }) => {return paddingLeft ? paddingLeft : '15px'}};
    ${({ column }) => {return column && css`
        flex-direction: column;
        justify-content:center;
        align-items:flex-start};
    `} }
    justify-content: ${({ justify }) => {return justify ? justify : 'start'}};
    @media (max-width: 768px) {
        padding: 0;
        justify-content: center;
    }
    @media (max-width: 576px) {
        width: 70px;
        max-width: 70px;
        min-width: 70px;
    }
`
export const CheckBoxWrapper = styled.div`
  position: relative;
`
export const ContentList = styled.div`
    /* border: 1px solid red; */
    display: grid;
    overflow: hidden;
    padding: 10px;
    gap: 5px;
    background-color: ${`${PLVColor}90`};
    margin: 0px 10px; 
    width: 100%;
    `
export const Title = styled.h5`
    font-family: PFont-Light;
    font-size: 16px;

`
export const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 55px;
  height: 26px;
  border-radius: 15px;
  cursor: pointer;

`
export const CheckBox = styled.input`
  opacity: 1;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  transform: none !important;
  zoom: inherit !important;

`
export const SectionTitles = styled.div`
    display: grid;
    grid-template-columns: ${({ columnWidth }) => {return columnWidth ? columnWidth?.map(x => {return `${x.width} `}) : '1fr'}}; 
    height: auto;
    align-items: center;
    margin: 0 auto;
    place-content: center;
    border-bottom: 1px solid #f0f0f0;
    :hover {
        background-color: #e9e9e933;
        :first-child {
            background-color: #fff;
        }
    }

`
export const ArrowsLabel = styled.label`
    display: flex;
    flex-direction: column;
    user-select: none; 
    position: relative;

`
// pagination
export const Input = styled.input`
    overflow: hidden;
    border: 2px solid transparent;
    outline: none;
    border-radius: 4px;
    padding: 10px;
    margin: 10px 0px;
    &&:focus {
        border: 2px solid ${PVColor};
    }
`
export const CicleStatus = styled.div`
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background-color: ${({ status })=> {return status === 'To do' && PVColor}};
`
export const CardsComponent = styled.div`
    background-color: ${BGColor};
    padding: 15px;
    border-radius: 1%;
    height: 100px;
    min-height: 100px;
`
export const ButtonPagination = styled.button`
    background-color: ${BGColor};
    padding: 15px;
    margin: 15px;
    min-height: 50px;
    max-height: 50px;
    min-width: 50px;
    max-width: 50px;
    ${props => {return props.Active && css`
    border: 1px solid ${`${SECColor}78`};
        color: ${PSColor};
    `}}

`
export const ButtonPrev = styled.button`
    background-color: ${BGColor};
    /* border: 1px solid ${SECColor}; */
    clip-path: polygon(9% 0, 90% 0, 100% 8%, 100% 93%, 94% 100%, 7% 100%, 0 93%, 0 8%);
    padding: 15px;
    background-color:${`${SECColor}14`};


`
export const ButtonNext = styled(ButtonPrev)`

`
