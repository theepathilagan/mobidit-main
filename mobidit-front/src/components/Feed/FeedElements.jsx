import { styled } from "styled-components";

export const FeedContainer = styled.section`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
`

export const FeedHeader = styled.div`
    width: 100%;
    height: 75px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`

export const FeedTitle = styled.h1`
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    font-size: 30px;
    color: #FF5A5F;
`

export const FeedContent = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const FeedButton = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 100%;
`

export const FeedAdd = styled.div`
    width: 400px;
    height: 50px;
    background-color: #FF5A5F;
    margin-bottom: 15px;
`
