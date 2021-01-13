import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
export const Body = styled.View`
  flex: 1;
  height: 100%;
  background-color: #fcfaff;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;
export const Column = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
`;
export const Temp = styled.Text`
  font-size: 26px;
  font-weight: bold;
  margin-top: 40px;
`;
export const Text = styled.Text`
  margin: 2px;
  font-size: 16px;
  color: #484554;
`;
export const Button = styled.TouchableOpacity`
  height: 50px;
  justify-content: center;
  width: 90%;
  background-color: #7473d6;
  border-radius: 4px;
`;
export const TextButton = styled.Text`
  font-size: 16px;
  text-align: center;
  color: white;
  font-weight: 600;
`;
export const View = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: white;
`;
