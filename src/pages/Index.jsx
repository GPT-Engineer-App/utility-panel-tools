import React, { useState } from "react";
import { Box, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Textarea, Button, Input, VStack, HStack, Text, UnorderedList, ListItem, useToast } from "@chakra-ui/react";
import { FaSave, FaEdit, FaTrash, FaDownload } from "react-icons/fa";

const Index = () => {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editedNoteText, setEditedNoteText] = useState("");
  const [domain, setDomain] = useState("");
  const [ip, setIp] = useState("");
  const [urls, setUrls] = useState("");
  const toast = useToast();

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleUppercase = () => {
    setText(text.toUpperCase());
  };

  const handleLowercase = () => {
    setText(text.toLowerCase());
  };

  const handleSaveNote = () => {
    if (text.trim() !== "") {
      const newNote = {
        id: Date.now(),
        text: text,
      };
      setNotes([...notes, newNote]);
      setText("");
      toast({
        title: "Note saved",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleEditNote = (noteId) => {
    const noteToEdit = notes.find((note) => note.id === noteId);
    setEditingNoteId(noteId);
    setEditedNoteText(noteToEdit.text);
  };

  const handleUpdateNote = () => {
    const updatedNotes = notes.map((note) => {
      if (note.id === editingNoteId) {
        return { ...note, text: editedNoteText };
      }
      return note;
    });
    setNotes(updatedNotes);
    setEditingNoteId(null);
    setEditedNoteText("");
    toast({
      title: "Note updated",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleDeleteNote = (noteId) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);
    toast({
      title: "Note deleted",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleDownloadUrls = () => {
    const urlList = urls.split("\n");
    urlList.forEach((url) => {
      const link = document.createElement("a");
      link.href = url;
      link.download = url.substring(url.lastIndexOf("/") + 1);
      link.click();
    });
    toast({
      title: "Files downloaded",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box maxWidth="800px" margin="auto" padding={4}>
      <Heading as="h1" size="xl" textAlign="center" marginBottom={8}>
        Web Utility Panel
      </Heading>
      <Tabs>
        <TabList>
          <Tab>Text Manipulation</Tab>
          <Tab>Notes</Tab>
          <Tab>Domain & IP</Tab>
          <Tab>Bulk File Downloader</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <VStack spacing={4} align="stretch">
              <Textarea value={text} onChange={handleTextChange} placeholder="Enter text here..." rows={10} />
              <HStack spacing={4}>
                <Button onClick={handleUppercase}>Uppercase</Button>
                <Button onClick={handleLowercase}>Lowercase</Button>
              </HStack>
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack spacing={4} align="stretch">
              <Textarea value={text} onChange={handleTextChange} placeholder="Enter note text here..." rows={5} />
              <Button onClick={handleSaveNote} leftIcon={<FaSave />}>
                Save Note
              </Button>
              <UnorderedList>
                {notes.map((note) => (
                  <ListItem key={note.id}>
                    {editingNoteId === note.id ? (
                      <>
                        <Textarea value={editedNoteText} onChange={(e) => setEditedNoteText(e.target.value)} />
                        <Button size="sm" onClick={handleUpdateNote}>
                          Update
                        </Button>
                      </>
                    ) : (
                      <>
                        <Text>{note.text}</Text>
                        <Button size="sm" onClick={() => handleEditNote(note.id)} leftIcon={<FaEdit />}>
                          Edit
                        </Button>
                        <Button size="sm" onClick={() => handleDeleteNote(note.id)} leftIcon={<FaTrash />}>
                          Delete
                        </Button>
                      </>
                    )}
                  </ListItem>
                ))}
              </UnorderedList>
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack spacing={4} align="stretch">
              <Input value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="Enter domain" />
              <Text>Domain: {domain}</Text>
              <Input value={ip} onChange={(e) => setIp(e.target.value)} placeholder="Enter IP address" />
              <Text>IP Address: {ip}</Text>
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack spacing={4} align="stretch">
              <Textarea value={urls} onChange={(e) => setUrls(e.target.value)} placeholder="Enter file URLs (one per line)" rows={10} />
              <Button onClick={handleDownloadUrls} leftIcon={<FaDownload />}>
                Download Files
              </Button>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Index;
