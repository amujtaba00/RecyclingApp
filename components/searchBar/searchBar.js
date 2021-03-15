// import React in our code
import React, { useState } from "react";
import data from "../data.json";
// import all the components we are going to use
import { Text, StyleSheet, View } from "react-native";
import { SearchBar } from "react-native-elements";

const BarSearch = () => {
  const [search, setSearch] = useState("");
  const [DataSource, setFilteredDataSource] = useState();

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank

    if (text) {
      // Inserted text is not blank
      // Filter the DataSource
      // Update FilteredDataSource
      const newData = DataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      console.log(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with DataSource
      setFilteredDataSource(DataSource);
      setSearch(text);
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar
        round
        searchIcon={{ size: 24 }}
        onChangeText={(text) => searchFilterFunction(text)}
        onClear={(text) => searchFilterFunction("")}
        placeholder="Type Here..."
        value={search}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});

export default BarSearch;
