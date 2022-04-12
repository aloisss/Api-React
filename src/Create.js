import {Form} from "react-bootstrap";
import React, {  useState } from "react";
import Button from 'react-bootstrap/Button';
import Results from './Results';

const Create=(props)=>{
    const modelInputs = props?.model?.data?.attributes?.metadata?.attributes;
    const modelId = props?.model?.data?.id;
    const [inputs,setInput]=useState({});
    const [response, setResponse] = useState({});

    // callback provided to components to update the state of form values
      const modelChanged = (modelQuestion, value) => {
        setInput((currentValues) => {
          currentValues[modelQuestion] = value;
          return currentValues;
        });
      };

        const onSubmit = (e) => {
          e.preventDefault();
          console.log(inputs)

          //constructing the object to post to the api
          const data = {
            "data": {
                      "type": "scenario",
                      "attributes": {
                        "input": {inputs}
            }
          }
        }

          const requestOptions = {
              method: 'POST',
              headers: {
              Authorization: "Token 9307bfd5fa011428ff198bb37547f979",
              "Content-Type": "application/vnd.api+json",
            },
              body: JSON.stringify({ data })
          };

          fetch(`https://api.up2tom.com/v3/decision/${modelId}`, requestOptions)
          .then(res => res.json())
          .then(data => setResponse({ data }))
          .then(message=>console.log("yah"));
        };

      return(
        <>

<div className="container">
          <Form noValidate onSubmit={onSubmit}>
            <Form.Text className="text-muted">
              Please provide answers to these questions
            </Form.Text>
            {modelInputs.map(model => {
              return (
                <Form.Group className="mb-3" controlId={model?.name}>
                  <Form.Label>{model?.question}</Form.Label>
                  <Form.Control name={model?.name} type={model?.type} onChange={(e) => {
                  // Notify the state list of the new value
                    modelChanged(model.question, e.target.value);
                  }}/>
                  <Form.Control.Feedback type="invalid">
                    Did you forget to input your {model.question}
                  </Form.Control.Feedback>
              </Form.Group>
              )
            })}
            <Button  variant="primary" type="submit">Submit</Button >
        </Form>
        
        
        


        </div>
        {response && <Results response={response}/>}
        
        </>
        
      )
}

export default Create;