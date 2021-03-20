// import React in our code
import React, { useState } from "react";
// import all the components we are going to use
import { Text, StyleSheet, View } from "react-native";
import { SearchBar } from "react-native-elements";
import recycleData from "../recycleData.json";

const BarSearch = () => {
  const [search, setSearch] = useState("");
  const [DataSource, setFilteredDataSource] = useState("");

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank

    // JUST TO DOUBLE CHECK IMPORT
    for (const category in recycleData["Info"]) {
      var productName = recycleData["Info"][category]["name"];
      console.log(productName);
    }

    console.log("HELLO");

    // if (text) {
    //   // Inserted text is not blank
    //   // Filter the DataSource
    //   // Update FilteredDataSource
    //   const newData = DataSource.filter(function (item) {
    //     const itemData = item.title
    //       ? item.title.toUpperCase()
    //       : "".toUpperCase();
    //     const textData = text.toUpperCase();
    //     return itemData.indexOf(textData) > -1;
    //   });
    //   setFilteredDataSource(newData);

    //   setSearch(text);
    // } else {
    //   // Inserted text is blank
    //   // Update FilteredDataSource with DataSource
    //   setFilteredDataSource(DataSource);
    //   setSearch(text);
    // }
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
