import styled from 'styled-components'

import { calculateResponsiveSize } from './../helpers'

export const StyledQuestion = styled.div`
  min-height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`

export const StyledAnswer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 5%;

  h2 {
    width: 50%;
    font-family: 'Gloria Hallelujah', cursive;
  }

  .teacher {
    padding-left: 10%;
    padding-right: 2%;
    text-align: left;
  }

  .student {
    padding-left: 2%;
    padding-right: 10%;
    text-align: right;
  }
`

export const StyledIllustration = styled.img`
  align-items: center;
  text-align: center;
  max-width: 25%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
`

export const StyledAlternatives = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: fixed;
  bottom: 0;

  .alternatives {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 0;
    padding: 10px;
    min-height: 150px;

    @media screen and (max-width: 600px) {
      flex-direction: column;
      justify-content: space-around;
    }
  }

  button {
    margin: 0 10px;
  }
`

export const StyledIcons = styled.div`
  width: 100%;
  display: flex;
  align-items: baseline;
  justify-content: space-around;

  .teacher {
    width: ${calculateResponsiveSize(150, 400)};
  }
  .student {
    width: ${calculateResponsiveSize(110, 320)};
  }
`
