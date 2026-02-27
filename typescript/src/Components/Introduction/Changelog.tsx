// tslint:disable:variable-name

import * as React from 'react';

import * as moment from 'moment';

const Description = (props: { children: React.ReactNode }) =>
    <div
        style={{
            fontStyle: 'italic',
            margin: '10px 0 10px 0'
        }}
    >
        {props.children}
    </div>;

const ListItem = (props: {children: React.ReactNode}) =>
    <li>{props.children}</li>;

const Feature = (props: { children: string }) => 
    <ListItem>{props.children}</ListItem>;

const FeatureList = (props: { children: React.ReactNode }) =>
    <ul style={{ margin: '0 0 0 16px', padding: 0 }}>{props.children}</ul>;

const Version = (props: { children: React.ReactNode, semver: string, date: moment.Moment }) => 
    <div style={{ fontSize: '0.8em' }}>
        <h3 style={{
            margin: '0 0 0 0',
            padding: 0,
        }}>v{props.semver}</h3>
        <small style={{ color: '#666' }}>updated {props.date.calendar()}</small>
        {props.children}
    </div>;

export default class Changelog extends React.Component<{}, {}> {
    public render() {
        return (
            <div>
                <Version semver="0.10.0a" date={moment('2018-09-07T12:07')}>
                    <Description>
                        The version where we started versioning properly. This is a list of all features up to this point.
                    </Description>
                    <FeatureList>
                        <Feature>Write a dice expression and roll the dice.</Feature>
                        <Feature>Add or subtract a constant from the roll.</Feature>
                        <Feature>View quick stats about each roll.</Feature>
                        <Feature>View distribution graphs for each roll.</Feature>
                    </FeatureList>
                </Version>
            </div>
        );
    }
}