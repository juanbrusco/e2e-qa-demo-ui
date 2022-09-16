import React, { useState, useEffect } from 'react';
import {
  Grid,
  Column,
  TextInput,
  Button,
  Accordion,
  AccordionItem,
  Dropdown,
  Stack,
  AccordionSkeleton,
  TextInputSkeleton,
  ButtonSkeleton,
  SkeletonText,
  Tile,
  Link,
  Slider
} from '@carbon/react';
import Notifications from '../../components/Notifications/Notifications';
import CommonService from '../../services/common.service';

const LandingPage = () => {

  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(false);

  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState([]);

  const [selectedMaxResults, setSelectedMaxResults] = useState(5);
  const [selectedCollection, setSelectedCollection] = useState('');
  const [collections, setCollections] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [models, setModels] = useState([]);

  const onChangeCollection = (e) => {
    setSelectedCollection(e.selectedItem);
  }

  const onChangeModel = (e) => {
    setSelectedModel(e.selectedItem);
  }

  const getCollections = async () => {
    try {
      const response = await CommonService.getCollections();
      if (response.status === 200) {
        setCollections(response.data.data);
      } else {
        setNotifications(oldNotifications => [...oldNotifications, { kind: 'error', subject: { phrase: "Service Error", message: `Service to check collections returned error: ${response.message ? response.message : ''}`, timestamp: new Date() } }]);
      }
    } catch (err) {
      setNotifications(oldNotifications => [...oldNotifications, { kind: 'error', subject: { phrase: "Service Error", message: `Service to check collections returned error: ${err.code ? error.code : ''}`, timestamp: new Date() } }]);
    }
  }

  const getModels = async () => {
    try {
      const response = await CommonService.getModels();
      if (response.status === 200) {
        setModels(response.data.data);
      } else {
        setNotifications(oldNotifications => [...oldNotifications, { kind: 'error', subject: { phrase: "Service Error", message: `Service to check models returned error: ${response.message ? response.message : ''}`, timestamp: new Date() } }]);
      }
    } catch (err) {
      setNotifications(oldNotifications => [...oldNotifications, { kind: 'error', subject: { phrase: "Service Error", message: `Service to check models returned error: ${err.code ? error.code : ''}`, timestamp: new Date() } }]);
    }
  }

  const sendQuestion = async (event) => {
    console.log(question, selectedMaxResults, selectedCollection, selectedModel)
    event.preventDefault();
    setLoading(true);
    try {
      const response = await CommonService.sendQuestion(question, selectedMaxResults, selectedCollection, selectedModel);
      if (response.status === 200) {
        setLoading(false);
        setAnswers(response.data.data);
      } else {
        setError(true);
        setLoading(false);
        setNotifications(oldNotifications => [...oldNotifications, { kind: 'error', subject: { phrase: "Service Error", message: `Service returned error: ${response.message ? response.message : ''}`, timestamp: new Date() } }]);
      }
    } catch (err) {
      setError(true);
      setLoading(false);
      setNotifications(oldNotifications => [...oldNotifications, { kind: 'error', subject: { phrase: "Service Error", message: `Service returned error: ${err.code ? error.code : ''}`, timestamp: new Date() } }]);
    }
  }

  useEffect(() => {
    getCollections();
    getModels();
  });

  return (
    <>
      {notifications &&
        <Notifications notifications={notifications} />
      }

      <Grid fullWidth className="landing-page-grid">
        <Column lg={16} md={6} sm={4} className="landing-page-column">
          <h2>PrimeQA E2E QA Demo</h2>
        </Column>
        {loading &&
          <>
            <Column lg={6} md={4} sm={4} className="landing-page-column">
              <AccordionSkeleton open={false} count={1} />
            </Column>
            <Column lg={10} md={4} sm={4} className="landing-page-column">
              <Stack gap={6}>
                <TextInputSkeleton />
                <ButtonSkeleton />
                <SkeletonText />
              </Stack>
            </Column>
          </>
        }
        {!loading &&
          <>
            <Column lg={6} md={4} sm={4} className="landing-page-column">
              <Accordion>
                <AccordionItem title="Configuration parameters" open={true}>
                  <Stack gap={4}>
                    <Dropdown
                      id="select-c"
                      items={collections}
                      label="Collections"
                      itemToString={(item) => (item ? item.id : '')}
                      titleText="Select collection"
                      placeholder="Select ..."
                      onChange={(e) => {
                        onChangeCollection(e);
                      }}
                      selectedItem={selectedCollection}
                    />
                    <Dropdown
                      id="select-m"
                      items={models}
                      label="Models"
                      itemToString={(item) => (item ? item.id : '')}
                      titleText="Select model"
                      placeholder="Select ..."
                      onChange={(e) => {
                        onChangeModel(e);
                      }}
                      selectedItem={selectedModel}
                    />
                    <Slider
                      labelText="Results to display"
                      max={10}
                      min={1}
                      noValidate
                      stepMultiplier={1}
                      value={selectedMaxResults}
                      // onChange={e => setSelectedMaxResults(e.target.value)}
                      onChange={({ value }) => setSelectedMaxResults(value)}
                    />
                  </Stack>
                </AccordionItem>
              </Accordion>
            </Column>
            <Column lg={10} md={4} sm={4} className="landing-page-column">
              <Stack gap={6}>
                <TextInput
                  id="text-input-1"
                  type="text"
                  labelText="Ask a question"
                  placeholder="What would you like to know?"
                  value={question}
                  // onChange={onChangeQuestion}
                  onChange={e => setQuestion(e.target.value)}
                />
                <Button
                  disabled={selectedCollection === '' || selectedModel === '' || selectedMaxResults === 0 || question === ''}
                  onClick={sendQuestion}>
                  Ask</Button>
                {!loading && answers && answers.length > 0 &&
                  answers.map((e, index) => (
                    <Tile key={index}>
                      Answer: {e.name}
                      <br />
                      <br />
                      Passage: {e.color}
                      <br />
                      <br />
                      Ranking: {e.year}
                      <br />
                      <br />
                      <Link href="https://www.carbondesignsystem.com">Document</Link>
                    </Tile>
                  ))
                }
              </Stack>
            </Column>
          </>
        }
      </Grid >
    </>
  );
};

export default LandingPage;