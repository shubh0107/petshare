import React, { createRef, useState } from "react";
// import { getCurrentUser } from "../../services/user.service";

import { Grid, Icon, Card, Sticky, Ref, Segment, Dimmer, Header, Form } from 'semantic-ui-react';

import PetshareLogo from '../../assets/petshare_logo.png';
import PetsJson from '../../assets/pets.json';
import './Home.scss';


const navLinks = ["Home", "Adopters", "Guardians", "Help", "Contact"];
function Navbar() {
    return (
        <div className="navbar">
            <img src={PetshareLogo} alt={"Petshare India"} className="pethshare-logo" ></img>
            <div className="navbar-links">
                {navLinks.map((item) => (
                    <a href="" className="navlink" key={item}>{item}</a>
                ))}
            </div>
        </div>
    );
}


const postAuthorLink = authorObj => (
    <a>
        <Icon name='user' />
        {authorObj.name}
    </a>
)

const PetCard = petObj => {
    const [dimmerActive, setDimmerActive] = useState(false);

    console.log('CARD: ', dimmerActive);

    return (
        // <CardHoverOverlay key={petObj.id}>

        // onMouseEnter={e => setDimmerActive(true)} onMouseLeave={e => setDimmerActive(false)}

        <Card
            // key={petObj.id}
            fluid
            link
            className="pet-card"
            onMouseEnter={e => setDimmerActive(true)}
            onMouseLeave={e => setDimmerActive(false)}
        >
            <Dimmer.Dimmable blurring dimmed={dimmerActive}>
                <Dimmer active={dimmerActive} inverted>
                    <div className="dimmer-content">
                        Know More
                        <Icon name="arrow right" />
                    </div>
                </Dimmer>
                <div className="pet-image">
                    <img src={petObj.imageUrl} alt={petObj.name} />
                </div>
            </Dimmer.Dimmable>
            {/* <Image src={petObj.imageUrl} ui={false} className="pet-image" /> */}
            <Card.Content>
                <Card.Header>{petObj.name}</Card.Header>
                <Card.Meta>
                    <span className=''>{petObj.breed}</span>
                </Card.Meta>
                <Card.Description>
                    {petObj.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                {postAuthorLink(petObj.authorInfo)}
            </Card.Content>
        </Card>
        // </CardHoverOverlay>

    )
};




const FilterPanel = fitlerObj => {
    const [formState, setFormState] = useState({});

    const locationOptions = [
        { key: 'delhi', text: 'Delhi', value: 'delhi' },
        { key: 'bengaluru', text: 'Bengaluru', value: 'bengaluru' },
        { key: 'mumbai', text: 'Mumbai', value: 'mumbai' },
        { key: 'ahmedabad', text: 'Ahmedabad', value: 'ahmedabad' }
    ];
    const typeOfPetOptions = [
        { key: 'dog', text: 'Dog', value: 'dog' },
        { key: 'cat', text: 'Cat', value: 'cat' },
        { key: 'fish', text: 'Fish', value: 'fish' },
        { key: 'reptile', text: 'Reptile', value: 'reptile' }
    ];
    const breedOptions = [
        { key: 'affenpinscher', text: 'Affenpinscher', value: 'affenpinscher' },
        { key: 'poodle', text: 'Poodle', value: 'poodle' },
        { key: 'germanShephard', text: 'German Shephard', value: 'germanShephard' },
        { key: 'bulldog', text: 'Bulldog', value: 'bulldog' },
        { key: 'chihuahua', text: 'Chihuahua', value: 'chihuahua' },
        { key: 'rottweiler', text: 'Rottweiler', value: 'rottweiler' },
        { key: 'shibaInu', text: 'Shiba Inu', value: 'shibaInu' },
    ];

    const handleChange = (e, { name, value }) => setFormState({
        ...formState,
        [name]: value
    });


    console.log('FORM STATE: ', formState);

    return (
        <Segment raised>
            <Header as="h3">Filters</Header>

            <Form>
                <Form.Select
                    fluid
                    name="location"
                    label='Location'
                    options={locationOptions}
                    placeholder='Choose location...'
                    onChange={handleChange}
                />
                <Form.Select
                    fluid
                    name="typeOfPet"
                    label='Type of pet'
                    options={typeOfPetOptions}
                    placeholder='Choose type of pet...'
                    onChange={handleChange}
                />
                <Form.Select
                    fluid
                    name="breed"
                    label='Breed'
                    options={breedOptions}
                    placeholder='Choose breed...'
                    onChange={handleChange}
                />

                <Form.Field>

                    <label>Gender</label>
                    <Form.Group inline>
                        <Form.Radio
                            name="gender"
                            label='Male'
                            value='male'
                            checked={formState.gender && formState.gender === 'male'}
                            onChange={handleChange}
                        />
                        <Form.Radio
                            name="gender"
                            label='Female'
                            value='female'
                            checked={formState.gender && formState.gender === 'female'}
                            onChange={handleChange}
                        />
                        <Form.Radio
                            name="gender"
                            label="Doesn't matter"
                            value='any'
                            checked={formState.gender && formState.gender === 'any'}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form.Field>

            </Form>



        </Segment>
    )
}



const Home = (props) => {

    const pageRef = createRef();
    const innerContainerRef = createRef();

    console.log('PETS: ', PetsJson.pets);

    return (
        <Ref innerRef={pageRef}>
            <div>
                <Sticky context={pageRef}>
                    {Navbar()}
                </Sticky>
                <Ref innerRef={innerContainerRef}>
                    <div className="main-container">
                        <Grid>
                            <Grid.Column width={4} className="filter-container">
                                <Sticky context={innerContainerRef} offset={71}>
                                    {FilterPanel()}
                                </Sticky>
                            </Grid.Column>
                            <Grid.Column width={12} className="pet-cards-container">
                                <Grid container columns={3} doubling stackable relaxed>
                                    {PetsJson.pets.map((item, index) => <Grid.Column key={'pet-'+index}>{PetCard(item)}</Grid.Column>)}
                                </Grid>
                            </Grid.Column>
                        </Grid>
                    </div>
                </Ref>
            </div>
        </Ref>

    );
};

export default Home;
