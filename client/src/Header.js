
import React from "react";
import { Navbar, Nav } from 'react-bootstrap';
export default function Header() {
    return (
        <>

            <Navbar expand="lg" variant="light" bg="light">
                <Nav className="mr-auto">
                    <Nav.Link href="/game">Memory Game</Nav.Link>
                    <Nav.Link href="/">change level</Nav.Link>
                </Nav>
            </Navbar>

        </>
    )
}