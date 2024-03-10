import React, { useCallback, useState } from 'react';
import { Text, View, Button, ScrollView } from 'react-native';
import ListView from './listView';
import Avatar from "react-avatar-edit";
import { styled } from 'nativewind';

const StyledView = styled(View);

function Profile() {
  const [preview, setPreview] = useState(null);
  const [isCropping, setIsCropping] = useState(false);

  function onClose() {
    setPreview(null);
    setIsCropping(false);
  }

  function onCrop(pv) {
    setPreview(pv);
    setIsCropping(false);
  }

  function onBeforeFileLoad(elem) {
    if (elem.target.files[0].size > 2000000) {
      alert("File is too big!");
      elem.target.value = "";
    }
  }

  const setAvatar = useCallback(() => {
    setIsCropping(true);
  }, []);

  return (
    <StyledView className="flex-1 justify-start items-center px-4">
      <StyledView className="flex-column justify-center w-half mt-4">
        <div>
          {!isCropping && (
            <Avatar
              width={600}
              height={300}
              onCrop={onCrop}
              onClose={onClose}
              onBeforeFileLoad={onBeforeFileLoad}
              src={null}
            />
          )}
          {preview && (
            <>
              <img src={preview} alt="Preview" />
              {!isCropping && (
                <Button
                  title="Set Avatar"
                  onPress={setAvatar}
                />
              )}
            </>
          )}
          <h2>Username</h2>
        </div>

        <Button title="Friends" onPress={() => {}} />
      </StyledView>
    </StyledView>
  );
}

export default Profile;
