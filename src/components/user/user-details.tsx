import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { AppState, DefaultThunkAction } from '../../store';
import {
  User,
  startLoadingTransactions,
  startLoadingUserDetails,
} from '../../store/reducers';
import { Currency } from '../currency';
import { ConnectedPayment } from '../transaction';
import {
  AlertText,
  Card,
  CardContent,
  CenterSection,
  Column,
  Row,
} from '../ui';

interface StateProps {
  details: User;
}

interface ActionProps {
  startLoadingUserDetails(id: number): DefaultThunkAction;
  startLoadingTransactions(id: number): DefaultThunkAction;
}

type UserDetailsProps = StateProps &
  ActionProps &
  RouteComponentProps<{ id: number }>;

export class UserDetails extends React.Component<UserDetailsProps> {
  public componentDidMount(): void {
    console.log(this.props.match.params.id);
    this.props.startLoadingUserDetails(this.props.match.params.id);
    this.props.startLoadingTransactions(this.props.match.params.id);
  }

  public render(): JSX.Element {
    const user = this.props.details;
    if (!user) {
      return <>LOADING...</>;
    }
    return (
      <CenterSection>
        <Card width="100%">
          <CardContent>
            <Row>
              <Column>{user.name}</Column>
              <Column>
                <AlertText value={user.balance}>
                  <Currency value={user.balance} />
                </AlertText>
              </Column>
            </Row>

            <Row>
              <Column>
                <ConnectedPayment userId={user.id} />
              </Column>
              <Column>1</Column>
            </Row>
          </CardContent>
        </Card>
      </CenterSection>
    );
  }
}

const mapStateToProps = (state: AppState, { match }: UserDetailsProps) => ({
  details: getUser(state, match),
});

const mapDispatchToProps: ActionProps = {
  startLoadingUserDetails,
  startLoadingTransactions,
};

export const ConnectedUserDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetails);

// tslint:disable-next-line:no-any
function getUser(state: AppState, match: any): User {
  console.log(state, match, state.user[match.params.id]);

  return state.user[match.params.id];
}
